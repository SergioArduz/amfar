import { useEffect, useState } from "react";
import type { PagoDTO } from "../../api/pagosApi";

interface Props {
  pagoSeleccionado: PagoDTO | null;
  onGuardar: (codigo: string, estadoPago: string, metodoPago: string) => void;
  onCancelar: () => void;
}

function PagoEstadoForm({ pagoSeleccionado, onGuardar, onCancelar }: Props) {
  const [estadoPago, setEstadoPago] = useState("Pendiente");
  const [metodoPago, setMetodoPago] = useState("");

  useEffect(() => {
    if (pagoSeleccionado) {
      setEstadoPago(pagoSeleccionado.estadoPago);
      setMetodoPago(pagoSeleccionado.metodoPago || "");
    }
  }, [pagoSeleccionado]);

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pagoSeleccionado) return;
    onGuardar(pagoSeleccionado.codigo, estadoPago, metodoPago);
  };

  if (!pagoSeleccionado) {
    return (
      <div>
        <p className="text-gray-400 text-sm py-4 text-center">Selecciona un pago para modificar su estado.</p>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="space-y-4">
      <p className="text-sm text-gray-600">
        <strong>Pago:</strong> <span className="font-mono text-amfar-gold">{pagoSeleccionado.codigo}</span>
        {" — "}
        <strong>Monto:</strong> Bs. {pagoSeleccionado.monto}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Nuevo Estado</label>
          <select value={estadoPago} onChange={(e) => setEstadoPago(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm bg-white">
            <option value="Pendiente">Pendiente</option>
            <option value="Pagado">Pagado</option>
            <option value="Vencido">Vencido</option>
            <option value="Anulado">Anulado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Método de Pago</label>
          <input placeholder="Ej: Efectivo, Transferencia" value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm" />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancelar}
          className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all">
          Cancelar
        </button>
        <button type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-amfar-gold hover:bg-yellow-600 rounded-xl transition-all shadow-lg shadow-amfar-gold/20">
          Guardar Estado
        </button>
      </div>
    </form>
  );
}

export default PagoEstadoForm;
