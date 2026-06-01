import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  obtenerTutores,
  eliminarTutor
} from "../services/tutorService";

import { Tutor } from "../types/tutor";

import "../styles/Tutores.css";

function Tutores() {
  const navigate = useNavigate();

  const [tutores, setTutores] =
    useState<Tutor[]>([]);

  const [busqueda, setBusqueda] =
    useState("");

  useEffect(() => {
    cargarTutores();
  }, []);

  const cargarTutores = async () => {
    try {
      const data =
        await obtenerTutores();

      setTutores(data);
    }
    catch (error) {
      console.error(error);
    }
  };

  const handleNuevo = () => {
    navigate("/tutores/nuevo");
  };

  const handleEditar = (
    id: number
  ) => {
    navigate(
      `/tutores/editar/${id}`
    );
  };

  const handleEliminar = async (
    id: number
  ) => {
    const confirmar =
      window.confirm(
        "¿Eliminar tutor?"
      );

    if (!confirmar)
      return;

    try {
      await eliminarTutor(id);

      cargarTutores();
    }
    catch (error) {
      console.error(error);
    }
  };

  const tutoresFiltrados =
    tutores.filter(
      (t) =>
        `${t.nombre} ${t.apellido}`
          .toLowerCase()
          .includes(
            busqueda.toLowerCase()
          )
    );

  return (
    <div className="tutores-container">

      <div className="header">
        <h1>
          Gestión de Tutores
        </h1>

        <button
          className="btn-crear"
          onClick={handleNuevo}
        >
          Nuevo Tutor
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar tutor..."
        value={busqueda}
        onChange={(e) =>
          setBusqueda(
            e.target.value
          )
        }
        className="input-busqueda"
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>Teléfono</th>
            <th>Parentesco</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>

          {tutoresFiltrados.map(
            (t) => (
              <tr
                key={
                  t.idPersona
                }
              >
                <td>
                  {t.idPersona}
                </td>

                <td>
                  {t.nombre}
                  {" "}
                  {t.apellido}
                </td>

                <td>
                  {t.telefono}
                </td>

                <td>
                  {t.parentesco}
                </td>

                <td>

                  <button
                    className="btn-editar"
                    onClick={() =>
                      handleEditar(
                        t.idPersona
                      )
                    }
                  >
                    Editar
                  </button>

                  <button
                    className="btn-eliminar"
                    onClick={() =>
                      handleEliminar(
                        t.idPersona
                      )
                    }
                  >
                    Eliminar
                  </button>

                </td>

              </tr>
            )
          )}

        </tbody>
      </table>

    </div>
  );
}

export default Tutores;