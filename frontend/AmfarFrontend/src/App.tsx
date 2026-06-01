import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Login from "./pages/Login";
import Estudiantes from "./pages/Estudiantes";
import PrivateRoute from "./components/PrivateRoute";
import CrearEstudiante from "./pages/CrearEstudiante";
import EditarEstudiante from "./pages/EditarEstudiante";
import Tutores from "./pages/Tutores";
import CrearTutor from "./pages/CrearTutor";
import EditarTutor from "./pages/EditarTutor";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/estudiantes"
                    element={
                        <PrivateRoute>
                            <Estudiantes />
                        </PrivateRoute>
                    }
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
                  element={
                    <PrivateRoute>
                      <Tutores />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/tutores/nuevo"
                  element={
                    <PrivateRoute>
                      <CrearTutor />
                    </PrivateRoute>
                  }
                />
                
                <Route
                  path="/tutores/editar/:id"
                  element={
                    <PrivateRoute>
                      <EditarTutor />
                    </PrivateRoute>
                  }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;