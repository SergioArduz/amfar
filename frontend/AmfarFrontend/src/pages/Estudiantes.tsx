import { useEffect, useState } from "react";
import { obtenerEstudiantes } from "../services/estudianteService";
import { Estudiante } from "../types/estudiante";
import { useNavigate } from "react-router-dom";

import "../styles/Estudiantes.css";

function Estudiantes() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [busqueda, setBusqueda] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  const cargarEstudiantes = async () => {
    try {
      const data = await obtenerEstudiantes();
      setEstudiantes(data);
    } catch (error) {
      console.error(error);
    }
  };

  // ========================================
  // BOTONES
  // ========================================

  const handleNuevo = () => {
    navigate("/estudiantes/nuevo");
  };

  const handleEditar = (id: number) => {
    navigate(`/estudiantes/editar/${id}`);
  };

  const handleEliminar = (id: number) => {
    const confirmar = window.confirm(
      "¿Eliminar estudiante?"
    );

    if (confirmar) {
      alert(`Eliminar estudiante ${id}`);
    }
  };

  const estudiantesFiltrados = estudiantes.filter(
    (e) =>
      `${e.nombre} ${e.apellido}`
        .toLowerCase()
        .includes(busqueda.toLowerCase())
  );

  return (
    <div className="estudiantes-container">

      <div className="header">
        <h1>Gestión de Estudiantes</h1>

        <button
          className="btn-crear"
          onClick={handleNuevo}
        >
          Nuevo Estudiante
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar estudiante..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="input-busqueda"
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>Teléfono</th>
            <th>Instrumento Propio</th>
            <th>Tutores</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {estudiantesFiltrados.map((e) => (
            <tr key={e.idPersona}>
              <td>{e.idPersona}</td>

              <td>
                {e.nombre} {e.apellido}
              </td>

              <td>{e.telefono}</td>

              <td>
                {e.tieneInstrumento
                  ? "Sí"
                  : "No"}
              </td>

              <td>
                {e.tutores.length > 0
                  ? e.tutores
                      .map(
                        (t) =>
                          `${t.nombre} ${t.apellido}`
                      )
                      .join(", ")
                  : "Sin tutores"}
              </td>

              <td>
                <button
                  className="btn-editar"
                  onClick={() => handleEditar(e.idPersona)}
                >
                  Editar
                </button>

                <button
                  className="btn-eliminar"
                  onClick={() => handleEliminar(e.idPersona)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default Estudiantes;