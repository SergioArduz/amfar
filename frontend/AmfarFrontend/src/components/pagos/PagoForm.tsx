import { useState, useEffect } from "react";
import type { PagoDTO } from "../../api/pagosApi";
import toast from "react-hot-toast";

const METODOS_PAGO = ["Efectivo", "QR", "Tarjeta", "Transferencia"];

interface Props {
  onGuardar: (pago: PagoDTO) => void;
  codigoInscripcionInicial?: string;
}

function PagoForm({ onGuardar, codigoInscripcionInicial }: Props) {
  const [form, setForm] = useState<PagoDTO>({
    codigo: "",
    codigoInscripcion: codigoInscripcionInicial || "",
    fechaVencimiento: "",
    fechaPago: null,
    monto: 0,
    metodoPago: "",
    estadoPago: "Pendiente",
  });

  useEffect(() => {
    if (codigoInscripcionInicial) {
      setForm(prev => ({ ...prev, codigoInscripcion: codigoInscripcionInicial }));
    }
  }, [codigoInscripcionInicial]);

  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "monto" ? Number(value) : value,
    }));
  };

  const convertirFechaUTC = (fecha: string) => {
    if (!fecha) return "";
    return fecha.length === 10 ? `${fecha}T00:00:00Z` : `${fecha}:00Z`;
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.monto <= 0) {
      toast.error("El monto debe ser mayor a 0");
      return;
    }
    if (!form.metodoPago) {
      toast.error("Selecciona un método de pago");
      return;
    }

    const pagoEnviar: PagoDTO = {
      ...form,
      fechaVencimiento: convertirFechaUTC(form.fechaVencimiento),
      fechaPago:
        form.estadoPago === "Pagado" && form.fechaPago
          ? convertirFechaUTC(form.fechaPago)
          : null,
    };

    onGuardar(pagoEnviar);
    setForm({
      codigo: "",
      codigoInscripcion: form.codigoInscripcion,
      fechaVencimiento: "",
      fechaPago: null,
      monto: 0,
      metodoPago: "",
      estadoPago: "Pendiente",
    });
  };

  return (
    <form onSubmit={enviar} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Código Pago</label>
          <input name="codigo" placeholder="Auto-generado" value={form.codigo} onChange={manejarCambio}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm bg-gray-50 text-gray-500" readOnly />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Código Inscripción</label>
          <input name="codigoInscripcion" placeholder="Ej: INS-001" value={form.codigoInscripcion} onChange={manejarCambio} required
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Monto (Bs.)</label>
          <input name="monto" type="number" min="0" step="0.01" placeholder="0.00" value={form.monto} onChange={manejarCambio} required
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha Vencimiento</label>
          <input name="fechaVencimiento" type="datetime-local" value={form.fechaVencimiento} onChange={manejarCambio} required
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Estado</label>
          <select name="estadoPago" value={form.estadoPago} onChange={manejarCambio}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm bg-white">
            <option value="Pendiente">Pendiente</option>
            <option value="Pagado">Pagado</option>
            <option value="Vencido">Vencido</option>
            <option value="Anulado">Anulado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Método de Pago</label>
          <select name="metodoPago" value={form.metodoPago} onChange={manejarCambio} required
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm bg-white">
            <option value="">Seleccionar...</option>
            {METODOS_PAGO.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        {form.estadoPago === "Pagado" && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha de Pago</label>
            <input name="fechaPago" type="datetime-local" value={form.fechaPago ?? ""} onChange={manejarCambio} required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm" />
          </div>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <button type="submit" className="px-6 py-2.5 text-sm font-bold text-white bg-amfar-gold hover:bg-yellow-600 rounded-xl transition-all shadow-lg shadow-amfar-gold/20">
          Registrar Pago
        </button>
      </div>
    </form>
  );
}

export default PagoForm;
