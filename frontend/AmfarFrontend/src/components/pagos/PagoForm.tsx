import { useState, useEffect } from "react";
import type { PagoDTO } from "../../api/pagosApi";

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

    const pagoEnviar: PagoDTO = {
      ...form,
      fechaVencimiento: convertirFechaUTC(form.fechaVencimiento),
      fechaPago:
        form.estadoPago === "Pagado" && form.fechaPago
          ? convertirFechaUTC(form.fechaPago)
          : null,
    };

    onGuardar(pagoEnviar);
  };

  return (
    <form onSubmit={enviar} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Código Pago</label>
          <input name="codigo" placeholder="Ej: PAG-001" value={form.codigo} onChange={manejarCambio} required
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Código Inscripción</label>
          <input name="codigoInscripcion" placeholder="Ej: INS-001" value={form.codigoInscripcion} onChange={manejarCambio} required
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Monto (Bs.)</label>
          <input name="monto" type="number" placeholder="0.00" value={form.monto} onChange={manejarCambio} required
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha Vencimiento</label>
          <input name="fechaVencimiento" type="datetime-local" value={form.fechaVencimiento} onChange={manejarCambio} required
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Estado</label>
          <select name="estadoPago" value={form.estadoPago} onChange={manejarCambio}
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm bg-white">
            <option value="Pendiente">Pendiente</option>
            <option value="Pagado">Pagado</option>
            <option value="Vencido">Vencido</option>
            <option value="Anulado">Anulado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Método de Pago</label>
          <input name="metodoPago" placeholder="Ej: Efectivo, Transferencia" value={form.metodoPago} onChange={manejarCambio}
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm" />
        </div>
        {form.estadoPago === "Pagado" && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha de Pago</label>
            <input name="fechaPago" type="datetime-local" value={form.fechaPago ?? ""} onChange={manejarCambio} required
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm" />
          </div>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-amfar-gold hover:bg-yellow-600 rounded-xl transition-all shadow-lg shadow-amfar-gold/20">
          Guardar Pago
        </button>
      </div>
    </form>
  );
}

export default PagoForm;
