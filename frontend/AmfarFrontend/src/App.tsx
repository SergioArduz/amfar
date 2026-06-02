import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";

import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

import Estudiantes from "./pages/Estudiantes";
import Tutores from "./pages/Tutores";
import Usuarios from "./pages/Usuarios";

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
            path="/tutores"
            element={<Tutores />}
          />

          <Route
            path="/usuarios"
            element={<Usuarios />}
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