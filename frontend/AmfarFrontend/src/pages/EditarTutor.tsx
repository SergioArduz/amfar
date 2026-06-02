import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  obtenerTutorPorId,
  actualizarTutor
} from "../services/tutorService";
import toast from "react-hot-toast";

import "../styles/FormEstudiante.css";

function EditarTutor() {

  const { id } = useParams();

  const navigate =
    useNavigate();

  const [nombre, setNombre] =
    useState("");

  const [apellido, setApellido] =
    useState("");

  const [telefono, setTelefono] =
    useState("");

  const [parentesco,
    setParentesco] =
    useState("");

  const [cargando, setCargando] = useState(false);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    cargarTutor();
  }, []);

  const cargarTutor =
    async () => {
      setCargando(true);
      try {

        const tutor =
          await obtenerTutorPorId(
            Number(id)
          );

        setNombre(
          tutor.nombre
        );

        setApellido(
          tutor.apellido
        );

        setTelefono(
          tutor.telefono
        );

        setParentesco(
          tutor.parentesco
        );

      } catch (error) {
        console.error(error);
        toast.error("Error al cargar los datos del tutor");
      } finally {
        setCargando(false);
      }
    };

  const guardar =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      if (!nombre.trim() || !apellido.trim()) {
        toast.error("Nombre y apellido son requeridos");
        return;
      }

      setGuardando(true);
      try {

        await actualizarTutor(
          Number(id),
          {
            nombre,
            apellido,
            telefono,
            parentesco
          }
        );

        toast.success("Tutor actualizado correctamente");
        navigate("/tutores");

      } catch (error) {
        console.error(error);
        toast.error("Error al actualizar el tutor");
      } finally {
        setGuardando(false);
      }
    };

  if (cargando) return <div className="form-container"><h1>Cargando...</h1></div>;

  return (
    <div className="form-container">

      <div className="form-card">

        <h1>
          Editar Tutor
        </h1>

        <form
          onSubmit={guardar}
        >

          <div className="form-group">

            <label>
              Nombre
            </label>

            <input
              value={nombre}
              onChange={(e) =>
                setNombre(
                  e.target.value
                )
              }
              required
            />

          </div>

          <div className="form-group">

            <label>
              Apellido
            </label>

            <input
              value={apellido}
              onChange={(e) =>
                setApellido(
                  e.target.value
                )
              }
              required
            />

          </div>

          <div className="form-group">

            <label>
              Teléfono
            </label>

            <input
              value={telefono}
              onChange={(e) =>
                setTelefono(
                  e.target.value
                )
              }
            />

          </div>

          <div className="form-group">

            <label>
              Parentesco
            </label>

            <input
              value={parentesco}
              onChange={(e) =>
                setParentesco(
                  e.target.value
                )
              }
            />

          </div>

          <div className="form-buttons">

            <button
              type="button"
              className="btn-cancelar"
              onClick={() =>
                navigate(
                  "/tutores"
                )
              }
              aria-label="Cancelar y volver"
              disabled={guardando}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="btn-guardar"
              disabled={guardando}
            >
              {guardando ? "Guardando..." : "Guardar"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditarTutor;