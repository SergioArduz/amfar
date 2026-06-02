import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearEstudiante } from "../services/estudianteService";
import { obtenerTutores } from "../services/tutorService";

import "../styles/FormEstudiante.css";

function CrearEstudiante() {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");

    const [tieneInstrumento,
        setTieneInstrumento] = useState(false);

    const [tutores, setTutores] =
        useState<any[]>([]);

    const [idsTutores,
        setIdsTutores] =
        useState<number[]>([]);

    useEffect(() => {
        cargarTutores();
    }, []);

    const cargarTutores = async () => {
        try {

            const data =
                await obtenerTutores();

            setTutores(data);

        } catch (error) {

            console.error(error);

        }
    };

    const guardar = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        await crearEstudiante({
            nombre,
            apellido,
            telefono,
            tieneInstrumento,
            idsTutores
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

                    <div className="form-group">

                        <label>
                            Tutores
                        </label>

                        <div className="tutores-lista">

                            {tutores.map((tutor) => (

                                <label
                                    key={tutor.idPersona}
                                    className="tutor-item"
                                >

                                    <input
                                        type="checkbox"
                                        checked={idsTutores.includes(
                                            tutor.idPersona
                                        )}
                                        onChange={(e) => {

                                            if (e.target.checked) {

                                                setIdsTutores([
                                                    ...idsTutores,
                                                    tutor.idPersona
                                                ]);

                                            } else {

                                                setIdsTutores(
                                                    idsTutores.filter(
                                                        id =>
                                                            id !== tutor.idPersona
                                                    )
                                                );

                                            }
                                        }}
                                    />

                                    {tutor.nombre}
                                    {" "}
                                    {tutor.apellido}

                                </label>

                            ))}

                        </div>

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