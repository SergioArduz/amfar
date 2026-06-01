import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  obtenerUsuarioPorId,
  actualizarUsuario
} from "../services/usuarioService";

import "../styles/FormEstudiante.css";

function EditarUsuario() {

  const { id } = useParams();

  const navigate =
    useNavigate();

  const [nombre, setNombre] =
    useState("");

  const [apellido, setApellido] =
    useState("");

  const [telefono, setTelefono] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [rol, setRol] =
    useState(1);

  useEffect(() => {
    cargarUsuario();
  }, []);

  const cargarUsuario =
    async () => {

      try {

        const usuario =
          await obtenerUsuarioPorId(
            Number(id)
          );

        setNombre(
          usuario.nombre
        );

        setApellido(
          usuario.apellido
        );

        setTelefono(
          usuario.telefono
        );

        setEmail(
          usuario.email
        );

        setRol(
          usuario.rol
        );

      } catch (error) {

        console.error(error);

      }
    };

  const guardar =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      try {

        await actualizarUsuario(
          Number(id),
          {
            nombre,
            apellido,
            telefono,
            email,
            rol
          }
        );

        navigate("/usuarios");

      } catch (error) {

        console.error(error);

      }
    };

  return (
    <div className="form-container">

      <div className="form-card">

        <h1>
          Editar Usuario
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

          <div className="form-group">
            <label>
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />
          </div>

          <div className="form-group">
            <label>
              Rol
            </label>

            <select
              value={rol}
              onChange={(e) =>
                setRol(
                  Number(
                    e.target.value
                  )
                )
              }
            >
              <option value={1}>
                Administrador
              </option>

              <option value={2}>
                Directora
              </option>

              <option value={3}>
                Secretaria
              </option>

              <option value={4}>
                Profesor
              </option>
            </select>
          </div>

          <div className="form-buttons">

            <button
              type="button"
              className="btn-cancelar"
              onClick={() =>
                navigate(
                  "/usuarios"
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

export default EditarUsuario;