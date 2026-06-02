import { Edit2, Trash2, Package } from "lucide-react";
import type { PlanDTO } from "../../api/planesApi";

interface Props {
  planes: PlanDTO[];
  onEditar: (plan: PlanDTO) => void;
  onEliminar: (codigo: string) => void;
}

function PlanList({ planes, onEditar, onEliminar }: Props) {
  if (planes.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 text-gray-400">
        <Package size={48} className="text-gray-200" />
        <p className="text-sm">No hay planes registrados.</p>
      </div>
    );
  }

  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-50/50 text-gray-600 text-xs uppercase tracking-wider">
          <th className="px-4 py-3 font-semibold">Código</th>
          <th className="px-4 py-3 font-semibold">Nombre</th>
          <th className="px-4 py-3 font-semibold">Monto</th>
          <th className="px-4 py-3 font-semibold">Horas Sem.</th>
          <th className="px-4 py-3 font-semibold">Horas Mens.</th>
          <th className="px-4 py-3 font-semibold">Modalidad</th>
          <th className="px-4 py-3 font-semibold text-right">Acciones</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {planes.map((plan) => (
          <tr key={plan.codigo} className="hover:bg-gray-50 transition-colors group">
            <td className="px-4 py-3 text-xs font-mono font-bold text-gray-400">{plan.codigo}</td>
            <td className="px-4 py-3 font-medium text-amfar-black">{plan.nombrePlan}</td>
            <td className="px-4 py-3 text-sm text-gray-600">${plan.monto}</td>
            <td className="px-4 py-3 text-sm text-gray-600">{plan.horasSemanales}</td>
            <td className="px-4 py-3 text-sm text-gray-600">{plan.horasMensuales}</td>
            <td className="px-4 py-3">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${plan.esIndividual ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
                {plan.esIndividual ? "Individual" : "Grupal"}
              </span>
            </td>
            <td className="px-4 py-3 text-right">
              <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => onEditar(plan)} className="p-2 text-gray-400 hover:text-amfar-gold hover:bg-amfar-gold/10 rounded-lg transition-all" title="Editar">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => onEliminar(plan.codigo)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all" title="Eliminar">
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

export default PlanList;
