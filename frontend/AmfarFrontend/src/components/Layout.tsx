import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Layout.css";

function Layout() {

  const [menuAbierto, setMenuAbierto] =
    useState(false);

  const navigate =
    useNavigate();

  const cerrarSesion = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "usuario"
    );

    navigate("/");
  };

  return (
    <div className="layout">

      <header className="navbar">

        <div className="logo">
          AMFAR
        </div>

        <button
          className="menu-toggle"
          onClick={() =>
            setMenuAbierto(!menuAbierto)
          }
        >
          ☰
        </button>

        <nav
          className={`menu ${
            menuAbierto ? "activo" : ""
          }`}
        >
          <Link to="/estudiantes">
            Estudiantes
          </Link>

          <Link to="/tutores">
            Tutores
          </Link>

          <Link to="/usuarios">
            Usuarios
          </Link>

          <Link to="/planes">
            Planes
          </Link>

          <Link to="/inscripciones">
            Inscripciones
          </Link>

          <Link to="/pagos">
            Pagos
          </Link>

          <button
            className="btn-logout"
            onClick={cerrarSesion}
          >
            Cerrar Sesión
          </button>
        </nav>

      </header>

      <main className="contenido">
        <Outlet />
      </main>

    </div>
  );
}

export default Layout;