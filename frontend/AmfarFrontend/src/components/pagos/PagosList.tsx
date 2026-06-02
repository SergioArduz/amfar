import { Edit2, Trash2, DollarSign, FileText, Loader2 } from "lucide-react";
import type { PagoDTO } from "../../api/pagosApi";

interface Props {
  pagos: PagoDTO[];
  onCambiarEstado: (pago: PagoDTO) => void;
  onEliminar: (codigo: string) => void;
  onGenerarRecibo: (pago: PagoDTO) => void;
  generandoRecibo?: boolean;
}

const estadoColores: Record<string, string> = {
  Pendiente: "bg-yellow-100 text-yellow-800",
  Pagado: "bg-green-100 text-green-800",
  Vencido: "bg-red-100 text-red-800",
  Anulado: "bg-gray-100 text-gray-600",
};

function PagosList({ pagos, onCambiarEstado, onEliminar, onGenerarRecibo, generandoRecibo }: Props) {
  if (pagos.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 text-gray-400">
        <DollarSign size={48} className="text-gray-200" />
        <p className="text-sm">No hay pagos registrados.</p>
      </div>
    );
  }

  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-50/50 text-gray-600 text-xs uppercase tracking-wider">
          <th className="px-4 py-3 font-semibold">Código</th>
          <th className="px-4 py-3 font-semibold">Inscripción</th>
          <th className="px-4 py-3 font-semibold">Vencimiento</th>
          <th className="px-4 py-3 font-semibold">Fecha Pago</th>
          <th className="px-4 py-3 font-semibold">Monto</th>
          <th className="px-4 py-3 font-semibold">Método</th>
          <th className="px-4 py-3 font-semibold">Estado</th>
          <th className="px-4 py-3 font-semibold text-right">Acciones</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {pagos.map((pago) => (
          <tr key={pago.codigo} className="hover:bg-gray-50 transition-colors group">
            <td className="px-4 py-3 text-xs font-mono font-bold text-gray-400">{pago.codigo}</td>
            <td className="px-4 py-3 text-sm text-gray-600">{pago.codigoInscripcion}</td>
            <td className="px-4 py-3 text-sm text-gray-600">{new Date(pago.fechaVencimiento).toLocaleDateString()}</td>
            <td className="px-4 py-3 text-sm text-gray-600">
              {pago.fechaPago ? new Date(pago.fechaPago).toLocaleDateString() : <span className="text-gray-300 italic">—</span>}
            </td>
            <td className="px-4 py-3 text-sm font-semibold text-amfar-black">Bs. {pago.monto}</td>
            <td className="px-4 py-3 text-sm text-gray-600">{pago.metodoPago || <span className="text-gray-300 italic">—</span>}</td>
            <td className="px-4 py-3">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${estadoColores[pago.estadoPago] || "bg-gray-100 text-gray-600"}`}>
                {pago.estadoPago}
              </span>
            </td>
            <td className="px-4 py-3 text-right">
              <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {pago.estadoPago === "Pagado" && (
                  <button
                    onClick={() => onGenerarRecibo(pago)}
                    disabled={generandoRecibo}
                    className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-500/10 rounded-lg transition-all disabled:opacity-50"
                    title="Generar recibo"
                  >
                    {generandoRecibo ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} />}
                  </button>
                )}
                <button onClick={() => onCambiarEstado(pago)} className="p-2 text-gray-400 hover:text-amfar-gold hover:bg-amfar-gold/10 rounded-lg transition-all" title="Cambiar estado">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => onEliminar(pago.codigo)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all" title="Eliminar">
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PagosList;
