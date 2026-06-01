import type { PlanDTO } from "../../api/planesApi";

interface Props {
  planes: PlanDTO[];
  onEditar: (plan: PlanDTO) => void;
  onEliminar: (codigo: string) => void;
}

function PlanList({ planes, onEditar, onEliminar }: Props) {
  return (
    <div>
      <h3>Listado de Planes</h3>

      {planes.length === 0 ? (
        <p>No hay planes registrados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Monto</th>
              <th>Horas semanales</th>
              <th>Horas mensuales</th>
              <th>Modalidad</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {planes.map((plan) => (
              <tr key={plan.codigo}>
                <td>{plan.codigo}</td>
                <td>{plan.nombrePlan}</td>
                <td>{plan.monto}</td>
                <td>{plan.horasSemanales}</td>
                <td>{plan.horasMensuales}</td>
                <td>{plan.esIndividual ? "Individual" : "Grupal"}</td>
                <td>
                  <button onClick={() => onEditar(plan)}>Editar</button>
                  <button onClick={() => onEliminar(plan.codigo)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PlanList;