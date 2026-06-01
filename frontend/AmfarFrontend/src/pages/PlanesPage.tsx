import { useEffect, useState } from "react";

import { planesApi } from "../api/planesApi";
import { descuentosApi } from "../api/descuentosApi";

import type { PlanDTO } from "../api/planesApi";
import type { DescuentoDTO } from "../api/descuentosApi";

import PlanForm from "../components/planes/PlanForm";
import DescuentoForm from "../components/planes/DescuentoForm";
import PlanList from "../components/planes/PlanList";

function PlanesPage() {
  const [planes, setPlanes] = useState<PlanDTO[]>([]);
  const [descuentos, setDescuentos] = useState<DescuentoDTO[]>([]);

  const [planEditar, setPlanEditar] = useState<PlanDTO | null>(null);
  const [descuentoEditar, setDescuentoEditar] = useState<DescuentoDTO | null>(null);

  const cargarDatos = async () => {
    const planesData = await planesApi.obtenerTodos();
    const descuentosData = await descuentosApi.obtenerTodos();

    setPlanes(planesData);
    setDescuentos(descuentosData);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const guardarPlan = async (plan: PlanDTO) => {
    if (planEditar) {
      await planesApi.actualizar(planEditar.codigo, plan);
    } else {
      await planesApi.crear(plan);
    }

    setPlanEditar(null);
    cargarDatos();
  };

  const eliminarPlan = async (codigo: string) => {
    await planesApi.desactivar(codigo);
    cargarDatos();
  };

  const guardarDescuento = async (descuento: DescuentoDTO) => {
    if (descuentoEditar) {
      await descuentosApi.actualizar(descuentoEditar.codigo, descuento);
    } else {
      await descuentosApi.crear(descuento);
    }

    setDescuentoEditar(null);
    cargarDatos();
  };

  const eliminarDescuento = async (codigo: string) => {
    await descuentosApi.desactivar(codigo);
    cargarDatos();
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Gestión de Planes y Descuentos</h2>

      <section className="card">
        <PlanForm
          planEditar={planEditar}
          onGuardar={guardarPlan}
          onCancelar={() => setPlanEditar(null)}
        />
      </section>

      <section className="card">
        <PlanList
          planes={planes}
          onEditar={setPlanEditar}
          onEliminar={eliminarPlan}
        />
      </section>

      <section className="card">
        <DescuentoForm
          descuentoEditar={descuentoEditar}
          onGuardar={guardarDescuento}
          onCancelar={() => setDescuentoEditar(null)}
        />
      </section>

      <section className="card">
        <h3>Descuentos disponibles</h3>

        {descuentos.length === 0 ? (
          <p>No hay descuentos registrados.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Porcentaje</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {descuentos.map((descuento) => (
                <tr key={descuento.codigo}>
                  <td>{descuento.codigo}</td>
                  <td>{descuento.nombreDescuento}</td>
                  <td>{descuento.porcentaje}%</td>
                  <td>{descuento.descripcion}</td>
                  <td>
                    <button
                      className="btn-primary"
                      onClick={() => setDescuentoEditar(descuento)}
                    >
                      Editar
                    </button>{" "}
                    <button
                      className="btn-danger"
                      onClick={() => eliminarDescuento(descuento.codigo)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default PlanesPage;