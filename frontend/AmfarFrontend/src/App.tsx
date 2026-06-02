import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";

import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

import Estudiantes from "./pages/Estudiantes";
import CrearEstudiante from "./pages/CrearEstudiante";
import EditarEstudiante from "./pages/EditarEstudiante";

import Tutores from "./pages/Tutores";
import CrearTutor from "./pages/CrearTutor";
import EditarTutor from "./pages/EditarTutor";

import Usuarios from "./pages/Usuarios";
import CrearUsuario from "./pages/CrearUsuario";
import EditarUsuario from "./pages/EditarUsuario";

import PlanesPage from "./pages/PlanesPage";
import InscripcionesPage from "./pages/InscripcionesPage";
import PagosPage from "./pages/PagosPage";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* LOGIN */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* SISTEMA */}
        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >

          {/* Gestión Académica */}

          <Route
            path="/estudiantes"
            element={<Estudiantes />}
          />

          <Route
            path="/estudiantes/nuevo"
            element={<CrearEstudiante />}
          />

          <Route
            path="/estudiantes/editar/:id"
            element={<EditarEstudiante />}
          />


          {/* TUTORES */}

          <Route
            path="/tutores"
            element={<Tutores />}
          />

          <Route
            path="/tutores/nuevo"
            element={<CrearTutor />}
          />

          <Route
            path="/tutores/editar/:id"
            element={<EditarTutor />}
          />

          {/* USUARIOS */}

          <Route
            path="/usuarios"
            element={<Usuarios />}
          />

          <Route
            path="/usuarios/nuevo"
            element={<CrearUsuario />}
          />

          <Route
            path="/usuarios/editar/:id"
            element={<EditarUsuario />}
          />

          {/* Módulo Inscripciones */}

          <Route
            path="/planes"
            element={<PlanesPage />}
          />

          <Route
            path="/inscripciones"
            element={<InscripcionesPage />}
          />

          <Route
            path="/pagos"
            element={<PagosPage />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;