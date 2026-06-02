import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  obtenerEstudiantePorId,
  actualizarEstudiante
} from "../services/estudianteService";

import { obtenerTutores }
  from "../services/tutorService";

import "../styles/FormEstudiante.css";

function EditarEstudiante() {

  const { id } = useParams();

  const navigate =
    useNavigate();

  const [nombre, setNombre] =
    useState("");

  const [apellido, setApellido] =
    useState("");

  const [telefono, setTelefono] =
    useState("");

  const [tieneInstrumento,
    setTieneInstrumento] =
    useState(false);

  const [tutores,
    setTutores] =
    useState<any[]>([]);

  const [idsTutores,
    setIdsTutores] =
    useState<number[]>([]);

  useEffect(() => {
    cargar();
    cargarTutores();
  }, []);

  const cargar = async () => {

    try {

      const estudiante =
        await obtenerEstudiantePorId(
          Number(id)
        );

      setNombre(
        estudiante.nombre
      );

      setApellido(
        estudiante.apellido
      );

      setTelefono(
        estudiante.telefono
      );

      setTieneInstrumento(
        estudiante.tieneInstrumento
      );

      if (estudiante.tutores) {

        setIdsTutores(
          estudiante.tutores.map(
            (t: any) =>
              t.idTutor ??
              t.idPersona
          )
        );

      }

    } catch (error) {

      console.error(error);

    }
  };

  const cargarTutores =
    async () => {

      try {

        const data =
          await obtenerTutores();

        setTutores(data);

      } catch (error) {

        console.error(error);

      }
    };

  const manejarTutor =
    (idTutor: number) => {

      if (
        idsTutores.includes(
          idTutor
        )
      ) {

        setIdsTutores(
          idsTutores.filter(
            (id) =>
              id !== idTutor
          )
        );

      } else {

        setIdsTutores([
          ...idsTutores,
          idTutor
        ]);

      }
    };

  const guardar =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      try {

        await actualizarEstudiante(
          Number(id),
          {
            nombre,
            apellido,
            telefono,
            tieneInstrumento,
            idsTutores
          }
        );

        navigate(
          "/estudiantes"
        );

      } catch (error) {

        console.error(error);

      }
    };

  return (
    <div className="form-container">

      <div className="form-card">

        <h1>
          Editar Estudiante
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

          <div className="checkbox-group">

            <input
              type="checkbox"
              checked={
                tieneInstrumento
              }
              onChange={(e) =>
                setTieneInstrumento(
                  e.target.checked
                )
              }
            />

            <label>
              Tiene instrumento
              propio
            </label>

          </div>

          <div className="form-group">

            <label>
              Tutores
            </label>

            <div
              style={{
                display: "flex",
                flexDirection:
                  "column",
                gap: "8px",
                marginTop: "10px"
              }}
            >

              {tutores.map(
                (tutor) => (

                  <label
                    key={
                      tutor.idPersona
                    }
                  >
                    <input
                      type="checkbox"
                      checked={idsTutores.includes(
                        tutor.idPersona
                      )}
                      onChange={() =>
                        manejarTutor(
                          tutor.idPersona
                        )
                      }
                    />

                    {" "}
                    {tutor.nombre}
                    {" "}
                    {tutor.apellido}
                  </label>

                )
              )}

            </div>

          </div>

          <div className="form-buttons">

            <button
              type="button"
              className="btn-cancelar"
              onClick={() =>
                navigate(
                  "/estudiantes"
                )
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

export default EditarEstudiante;