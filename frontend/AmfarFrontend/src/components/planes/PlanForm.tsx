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
    if (planEditar) {
      setForm(planEditar);
    }
  }, [planEditar]);

  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === "monto" || name === "horasSemanales" || name === "horasMensuales"
          ? Number(value)
          : name === "esIndividual"
          ? value === "true"
          : value,
    });
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    onGuardar(form);
  };

  return (
    <form onSubmit={enviar}>
      <h3>{planEditar ? "Editar Plan" : "Registrar Plan"}</h3>

      <input
        name="codigo"
        placeholder="Código"
        value={form.codigo}
        onChange={manejarCambio}
        disabled={!!planEditar}
        required
      />

      <input
        name="nombrePlan"
        placeholder="Nombre del plan"
        value={form.nombrePlan}
        onChange={manejarCambio}
        required
      />

      <input
        name="monto"
        type="number"
        placeholder="Monto"
        value={form.monto}
        onChange={manejarCambio}
        required
      />

      <input
        name="horasSemanales"
        type="number"
        placeholder="Horas semanales"
        value={form.horasSemanales}
        onChange={manejarCambio}
        required
      />

      <input
        name="horasMensuales"
        type="number"
        placeholder="Horas mensuales"
        value={form.horasMensuales}
        onChange={manejarCambio}
        required
      />

      <select name="esIndividual" value={String(form.esIndividual)} onChange={manejarCambio}>
        <option value="true">Individual</option>
        <option value="false">Grupal</option>
      </select>

      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancelar}>
        Cancelar
      </button>
    </form>
  );
}

export default PlanForm;