import { useEffect, useState } from "react";
import type { PlanDTO } from "../../api/planesApi";

interface Props {
  planEditar: PlanDTO | null;
  onGuardar: (plan: PlanDTO) => void;
  onCancelar: () => void;
}

function PlanForm({ planEditar, onGuardar, onCancelar }: Props) {
  const [form, setForm] = useState<PlanDTO>({
    codigo: "",
    nombrePlan: "",
    monto: 0,
    horasSemanales: 0,
    horasMensuales: 0,
    esIndividual: true,
  });

  useEffect(() => {
    if (planEditar) setForm(planEditar);
  }, [planEditar]);

  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "monto" || name === "horasSemanales" || name === "horasMensuales"
          ? Number(value)
          : name === "esIndividual"
          ? value === "true"
          : value,
    }));
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    onGuardar(form);
  };

  return (
    <form onSubmit={enviar} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Código</label>
          <input
            name="codigo"
            placeholder="Ej: PLAN-001"
            value={form.codigo}
            onChange={manejarCambio}
            disabled={!!planEditar}
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre del Plan</label>
          <input
            name="nombrePlan"
            placeholder="Ej: Clase individual"
            value={form.nombrePlan}
            onChange={manejarCambio}
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Monto ($)</label>
          <input
            name="monto"
            type="number"
            placeholder="0.00"
            value={form.monto}
            onChange={manejarCambio}
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Horas Semanales</label>
          <input
            name="horasSemanales"
            type="number"
            placeholder="Ej: 1"
            value={form.horasSemanales}
            onChange={manejarCambio}
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Horas Mensuales</label>
          <input
            name="horasMensuales"
            type="number"
            placeholder="Ej: 4"
            value={form.horasMensuales}
            onChange={manejarCambio}
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Modalidad</label>
          <select name="esIndividual" value={String(form.esIndividual)} onChange={manejarCambio} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm bg-white">
            <option value="true">Individual</option>
            <option value="false">Grupal</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancelar} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all">
          Cancelar
        </button>
        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-amfar-gold hover:bg-yellow-600 rounded-xl transition-all shadow-lg shadow-amfar-gold/20">
          {planEditar ? "Actualizar Plan" : "Guardar Plan"}
        </button>
      </div>
    </form>
  );
}

export default PlanForm;
