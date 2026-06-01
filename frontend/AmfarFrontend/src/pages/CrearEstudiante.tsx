import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearEstudiante } from "../services/estudianteService";

import "../styles/FormEstudiante.css";

function CrearEstudiante() {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");

    const [tieneInstrumento,
        setTieneInstrumento] = useState(false);

    const guardar = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        await crearEstudiante({
            nombre,
            apellido,
            telefono,
            tieneInstrumento,
            idsTutores: []
        });

        navigate("/estudiantes");
    };

    return (
        <div className="form-container">

            <div className="form-card">

            <h1>Nuevo Estudiante</h1>

            <form onSubmit={guardar}>

                <div className="form-group">
                <label>Nombre</label>

                <input
                    value={nombre}
                    onChange={(e) =>
                    setNombre(e.target.value)
                    }
                />
                </div>

                <div className="form-group">
                <label>Apellido</label>

                <input
                    value={apellido}
                    onChange={(e) =>
                    setApellido(e.target.value)
                    }
                />
                </div>

                <div className="form-group">
                <label>Teléfono</label>

                <input
                    value={telefono}
                    onChange={(e) =>
                    setTelefono(e.target.value)
                    }
                />
                </div>

                <div className="checkbox-group">

                <input
                    type="checkbox"
                    checked={tieneInstrumento}
                    onChange={(e) =>
                    setTieneInstrumento(
                        e.target.checked
                    )
                    }
                />

                <label>
                    Tiene instrumento propio
                </label>

                </div>

                <div className="form-buttons">

                <button
                    type="button"
                    className="btn-cancelar"
                    onClick={() =>
                    navigate("/estudiantes")
                    }
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    className="btn-guardar"
                >
                    Guardar
                </button>

                </div>

            </form>

            </div>

        </div>
        );
}

export default CrearEstudiante;