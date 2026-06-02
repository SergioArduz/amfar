import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearTutor } from "../services/tutorService";
import toast from "react-hot-toast";

import "../styles/FormEstudiante.css";

function CrearTutor() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [parentesco, setParentesco] = useState("");
  const [cargando, setCargando] = useState(false);

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !apellido.trim()) {
      toast.error("Nombre y apellido son requeridos");
      return;
    }

    setCargando(true);
    try {
      await crearTutor({
        nombre,
        apellido,
        telefono,
        parentesco
      });

      toast.success("Tutor creado correctamente");
      navigate("/tutores");
    } catch (error) {
      console.error(error);
      toast.error("Error al crear el tutor");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h1>Nuevo Tutor</h1>
        <form onSubmit={guardar}>
          <div className="form-group">
            <label>Nombre</label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Apellido</label>
            <input
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Teléfono</label>
            <input
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Parentesco</label>
            <input
              value={parentesco}
              onChange={(e) => setParentesco(e.target.value)}
            />
          </div>

          <div className="form-buttons">
            <button
              type="button"
              className="btn-cancelar"
              onClick={() => navigate("/tutores")}
              aria-label="Cancelar y volver"
              disabled={cargando}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-guardar"
              disabled={cargando}
            >
              {cargando ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CrearTutor;