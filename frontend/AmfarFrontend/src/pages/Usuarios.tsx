import { useEffect, useState } from "react";

import {
  obtenerUsuarios,
  eliminarUsuario
} from "../services/usuarioService";

import { Usuario }
  from "../types/usuario";

import {
  useNavigate
} from "react-router-dom";

import "../styles/Estudiantes.css";

function Usuarios() {

  const navigate =
    useNavigate();

  const [usuarios,
    setUsuarios] =
    useState<Usuario[]>([]);

  const [busqueda,
    setBusqueda] =
    useState("");

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios =
    async () => {

      const data =
        await obtenerUsuarios();

      setUsuarios(data);
    };

  const handleNuevo = () => {
    navigate("/usuarios/nuevo");
  };

  const handleEditar = (
    id: number
  ) => {
    navigate(
      `/usuarios/editar/${id}`
    );
  };

  const handleEliminar =
    async (id: number) => {

      const confirmar =
        window.confirm(
          "¿Eliminar usuario?"
        );

      if (!confirmar)
        return;

      await eliminarUsuario(id);

      cargarUsuarios();
    };

  const obtenerRol =
    (rol: number) => {

      switch (rol) {

        case 1:
          return "Administrador";

        case 2:
          return "Directora";

        case 3:
          return "Secretaria";

        case 4:
          return "Profesor";

        default:
          return "Sin rol";
      }
    };

  const filtrados =
    usuarios.filter(
      u =>
        `${u.nombre} ${u.apellido}`
          .toLowerCase()
          .includes(
            busqueda.toLowerCase()
          )
    );

  return (
    <div className="estudiantes-container">

      <div className="header">

        <h1>
          Gestión de Usuarios
        </h1>

        <button
          className="btn-crear"
          onClick={handleNuevo}
        >
          Nuevo Usuario
        </button>

      </div>

      <input
        type="text"
        placeholder="Buscar usuario..."
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
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>

        </thead>

        <tbody>

          {filtrados.map(u => (

            <tr key={u.idUsuario}>

              <td>
                {u.idUsuario}
              </td>

              <td>
                {u.nombre}
                {" "}
                {u.apellido}
              </td>

              <td>
                {u.email}
              </td>

              <td>
                {obtenerRol(u.rol)}
              </td>

              <td>

                <button
                  className="btn-editar"
                  onClick={() =>
                    handleEditar(
                      u.idUsuario
                    )
                  }
                >
                  Editar
                </button>

                <button
                  className="btn-eliminar"
                  onClick={() =>
                    handleEliminar(
                      u.idUsuario
                    )
                  }
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

export default Usuarios;