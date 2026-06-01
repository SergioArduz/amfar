import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";

import Estudiantes from "./pages/Estudiantes";
import Tutores from "./pages/Tutores";
import Usuarios from "./pages/Usuarios";

import CrearEstudiante from "./pages/CrearEstudiante";
import EditarEstudiante from "./pages/EditarEstudiante";

import CrearTutor from "./pages/CrearTutor";
import EditarTutor from "./pages/EditarTutor";

import CrearUsuario from "./pages/CrearUsuario";
import EditarUsuario from "./pages/EditarUsuario";

import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";

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

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;