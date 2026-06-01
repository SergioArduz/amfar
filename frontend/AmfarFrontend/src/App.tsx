import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";

import Layout from "./components/Layout";

import Estudiantes from "./pages/Estudiantes";
import Tutores from "./pages/Tutores";
import Usuarios from "./pages/Usuarios";

import PrivateRoute from "./components/PrivateRoute";

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
            path="/tutores"
            element={<Tutores />}
          />

          <Route
            path="/usuarios"
            element={<Usuarios />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;