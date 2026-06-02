import { useEffect, useState } from "react";

import { inscripcionesApi } from "../api/inscripcionesApi";
import { planesApi } from "../api/planesApi";
import { descuentosApi } from "../api/descuentosApi";
import { pagosApi } from "../api/pagosApi";

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
      const inscripcionesData = await inscripcionesApi.obtenerActivas();
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
      await inscripcionesApi.crear(inscripcion);

      const plan = planes.find((p) => p.codigo === inscripcion.codigoPlan);
      const descuento = descuentos.find(
        (d) => d.codigo === inscripcion.codigoDescuento
      );

      const montoPlan = plan ? plan.monto : 0;
      const porcentajeDescuento = descuento ? descuento.porcentaje : 0;
      const montoFinal =
        montoPlan - (montoPlan * porcentajeDescuento) / 100;

      const fechaVencimiento = new Date();
      fechaVencimiento.setMonth(fechaVencimiento.getMonth() + 1);

      await pagosApi.crear({
        codigo: `PAGO-${inscripcion.codigo}`,
        codigoInscripcion: inscripcion.codigo,
        fechaVencimiento: fechaVencimiento.toISOString(),
        fechaPago: null,
        monto: montoFinal,
        metodoPago: "",
        estadoPago: "Pendiente",
      });

      await cargarDatos();

      alert("Inscripción guardada y pago generado automáticamente.");
    } catch (error: any) {
      console.error("ERROR AL GUARDAR INSCRIPCIÓN O PAGO:", error);
      console.error("RESPUESTA BACKEND:", error.response?.data);

      alert(
        JSON.stringify(error.response?.data, null, 2) ||
          "No se pudo guardar la inscripción o generar el pago."
      );
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
                  <td>{new Date(inscripcion.fechaInicio).toLocaleDateString()}</td>
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