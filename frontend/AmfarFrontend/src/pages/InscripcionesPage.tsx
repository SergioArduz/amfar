import { useEffect, useState } from "react";

import { inscripcionesApi } from "../api/inscripcionesApi";
import { planesApi } from "../api/planesApi";
import { descuentosApi } from "../api/descuentosApi";

import type { InscripcionDTO } from "../api/inscripcionesApi";
import type { PlanDTO } from "../api/planesApi";
import type { DescuentoDTO } from "../api/descuentosApi";

import InscripcionForm from "../components/inscripciones/InscripcionForm";

function InscripcionesPage() {
  const [inscripciones, setInscripciones] = useState<InscripcionDTO[]>([]);
  const [planes, setPlanes] = useState<PlanDTO[]>([]);
  const [descuentos, setDescuentos] = useState<DescuentoDTO[]>([]);

  const cargarDatos = async () => {
    try {
      const inscripcionesData = await inscripcionesApi.obtenerTodas();
      const planesData = await planesApi.obtenerActivos();
      const descuentosData = await descuentosApi.obtenerActivos();

      setInscripciones(inscripcionesData);
      setPlanes(planesData);
      setDescuentos(descuentosData);
    } catch (error) {
      console.error("ERROR CARGANDO INSCRIPCIONES:", error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const guardarInscripcion = async (inscripcion: InscripcionDTO) => {
  try {
    console.log("ENVIANDO:", inscripcion);

    await inscripcionesApi.crear(inscripcion);
    await cargarDatos();

    alert("Inscripción guardada correctamente.");
  } catch (error: any) {
    console.error("ERROR COMPLETO:", error);
    console.error("ERROR BACKEND:", error.response?.data);

    alert(JSON.stringify(error.response?.data, null, 2));
  }
};
  const eliminarInscripcion = async (codigo: string) => {
    try {
      await inscripcionesApi.desactivar(codigo);
      await cargarDatos();
    } catch (error) {
      console.error("ERROR AL ELIMINAR INSCRIPCIÓN:", error);
      alert("No se pudo eliminar la inscripción.");
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Registro de Inscripciones</h2>

      <section className="card">
        <InscripcionForm
          planes={planes}
          descuentos={descuentos}
          onGuardar={guardarInscripcion}
        />
      </section>

      <section className="card">
        <h3>Listado de Inscripciones</h3>

        {inscripciones.length === 0 ? (
          <p>No hay inscripciones registradas.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Estudiante</th>
                <th>Plan</th>
                <th>Descuento</th>
                <th>Modalidad</th>
                <th>Fecha inicio</th>
                <th>Clases</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {inscripciones.map((inscripcion) => (
                <tr key={inscripcion.codigo}>
                  <td>{inscripcion.codigo}</td>
                  <td>{inscripcion.codigoEstudiante}</td>
                  <td>{inscripcion.codigoPlan}</td>
                  <td>{inscripcion.codigoDescuento || "Sin descuento"}</td>
                  <td>{inscripcion.modalidad}</td>
                  <td>{inscripcion.fechaInicio}</td>
                  <td>
                    {inscripcion.clases.map((clase, index) => (
                      <div key={index}>
                        {clase.diaSemana} {clase.horaInicio} - {clase.horaFin}
                      </div>
                    ))}
                  </td>
                  <td>
                    <button
                      className="btn-danger"
                      onClick={() => eliminarInscripcion(inscripcion.codigo)}
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

export default InscripcionesPage;