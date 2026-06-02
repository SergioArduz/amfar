import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { pagosApi } from "../api/pagosApi";
import type { PagoDTO } from "../api/pagosApi";
import { recibosApi } from "../api/recibosApi";
import type { ReciboDTO } from "../api/recibosApi";
import { DollarSign, FileText, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import PagosList from "../components/pagos/PagosList";
import PagoEstadoForm from "../components/pagos/PagoEstadoForm";
import PagoForm from "../components/pagos/PagoForm";

function PagosPage() {
  const [params] = useSearchParams();
  const inscripcionCodigo = params.get("inscripcion") || "";
  const [pagos, setPagos] = useState<PagoDTO[]>([]);
  const [pagoSeleccionado, setPagoSeleccionado] = useState<PagoDTO | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [reciboModal, setReciboModal] = useState<ReciboDTO | null>(null);
  const [generandoRecibo, setGenerandoRecibo] = useState(false);

  const cargarPagos = async () => {
    setCargando(true);
    setError("");
    try {
      const data = await pagosApi.obtenerTodos();
      setPagos(data);
    } catch {
      setError("Error al cargar pagos.");
      toast.error("No se pudieron cargar los pagos");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { cargarPagos(); }, []);

  const guardarPago = async (pago: PagoDTO) => {
    try {
      await pagosApi.crear(pago);
      await cargarPagos();
      toast.success("Pago guardado correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar el pago");
    }
  };

  const actualizarEstado = async (codigo: string, estadoPago: string, metodoPago: string) => {
    try {
      await pagosApi.actualizarEstado(codigo, estadoPago, metodoPago);
      setPagoSeleccionado(null);
      await cargarPagos();
      toast.success("Estado del pago actualizado");
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el estado del pago");
    }
  };

  const eliminarPago = async (codigo: string) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este pago?")) return;
    try {
      await pagosApi.desactivar(codigo);
      await cargarPagos();
      toast.success("Pago eliminado correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el pago");
    }
  };

  const generarRecibo = async (codigoPago: string) => {
    setGenerandoRecibo(true);
    try {
      const recibo = await recibosApi.generar(codigoPago);
      setReciboModal(recibo);
      toast.success("Recibo generado correctamente");
    } catch (error: any) {
      const msg = error?.response?.data?.mensaje || "No se pudo generar el recibo";
      toast.error(msg);
    } finally {
      setGenerandoRecibo(false);
    }
  };

  const handleVerRecibo = async (pago: PagoDTO) => {
    if (pago.estadoPago !== "Pagado") {
      toast.error("Solo se pueden generar recibos para pagos en estado 'Pagado'");
      return;
    }
    const existentes = await recibosApi.obtenerPorPago(pago.codigo);
    if (existentes.length > 0) {
      setReciboModal(existentes[0]);
    } else {
      await generarRecibo(pago.codigo);
    }
  };

  if (cargando) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-amfar-black">Gestión de Pagos</h1>
        </div>
        <div className="animate-pulse space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="h-4 bg-gray-100 rounded w-1/3 mb-4"></div>
              <div className="h-20 bg-gray-50 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-amfar-black">Gestión de Pagos</h1>
        <p className="text-gray-500">Administra los pagos de inscripciones y su estado.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">{error}</div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-amfar-black mb-4 flex items-center gap-2">
          <DollarSign size={20} className="text-amfar-gold" />
          Registrar Nuevo Pago
        </h2>
        <PagoForm onGuardar={guardarPago} codigoInscripcionInicial={inscripcionCodigo} />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-amfar-black mb-4">Actualizar Estado de Pago</h2>
        <PagoEstadoForm
          pagoSeleccionado={pagoSeleccionado}
          onGuardar={actualizarEstado}
          onCancelar={() => setPagoSeleccionado(null)}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-amfar-black mb-4">Listado de Pagos</h2>
        <PagosList
          pagos={pagos}
          onCambiarEstado={setPagoSeleccionado}
          onEliminar={eliminarPago}
          onGenerarRecibo={handleVerRecibo}
          generandoRecibo={generandoRecibo}
        />
      </div>

      {reciboModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setReciboModal(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setReciboModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 p-3 rounded-xl">
                <FileText size={24} className="text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-amfar-black">Recibo Generado</h2>
                <p className="text-sm text-gray-500">{reciboModal.numeroRecibo}</p>
              </div>
            </div>

            <div className="space-y-3 bg-gray-50 rounded-xl p-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">N° Recibo</span>
                <span className="font-bold text-amfar-black font-mono">{reciboModal.numeroRecibo}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Código Pago</span>
                <span className="font-semibold">{reciboModal.codigoPago}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Alumno</span>
                <span className="font-semibold">{reciboModal.datosAlumno}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Plan</span>
                <span className="font-semibold">{reciboModal.nombrePlan}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Período</span>
                <span className="font-semibold">{reciboModal.periodo}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Fecha Emisión</span>
                <span className="font-semibold">{new Date(reciboModal.fechaEmision).toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between text-sm">
                <span className="text-gray-700 font-semibold">Monto</span>
                <span className="text-lg font-bold text-amfar-gold">Bs. {reciboModal.monto}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Emitido por</span>
                <span className="font-semibold">{reciboModal.emitidoPor}</span>
              </div>
            </div>

            <button onClick={() => window.print()} className="mt-6 w-full py-3 bg-amfar-gold hover:bg-yellow-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-amfar-gold/20">
              Imprimir Recibo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PagosPage;
