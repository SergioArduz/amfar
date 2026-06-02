import { useEffect, useState } from "react";

import { pagosApi } from "../api/pagosApi";
import type { PagoDTO } from "../api/pagosApi";
import { DollarSign } from "lucide-react";
import toast from "react-hot-toast";

import PagosList from "../components/pagos/PagosList";
import PagoEstadoForm from "../components/pagos/PagoEstadoForm";
import PagoForm from "../components/pagos/PagoForm";

function PagosPage() {
  const [pagos, setPagos] = useState<PagoDTO[]>([]);
  const [pagoSeleccionado, setPagoSeleccionado] = useState<PagoDTO | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

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

  useEffect(() => {
    cargarPagos();
  }, []);

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

  const actualizarEstado = async (
    codigo: string,
    estadoPago: string,
    metodoPago: string
  ) => {
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
        <PagoForm onGuardar={guardarPago} />
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
        />
      </div>
    </div>
  );
}

export default PagosPage;
