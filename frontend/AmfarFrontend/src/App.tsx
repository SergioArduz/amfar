import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Link
} from "react-router-dom";

import Login from "./pages/Login";
import Estudiantes from "./pages/Estudiantes";
import PrivateRoute from "./components/PrivateRoute";
import CrearEstudiante from "./pages/CrearEstudiante";
import EditarEstudiante from "./pages/EditarEstudiante";

import Tutores from "./pages/Tutores";
import CrearTutor from "./pages/CrearTutor";
import EditarTutor from "./pages/EditarTutor";

import PlanesPage from "./pages/PlanesPage";
import InscripcionesPage from "./pages/InscripcionesPage";
import PagosPage from "./pages/PagosPage";

function App() {
    return (
        <BrowserRouter>

            <div className="page-container">
                <nav className="card">
                    <div
                        style={{
                            display: "flex",
                            gap: "20px",
                            alignItems: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <Link to="/planes">Planes</Link>
                        <Link to="/inscripciones">Inscripciones</Link>
                        <Link to="/pagos">Pagos</Link>
                        <Link to="/estudiantes">Estudiantes</Link>
                        <Link to="/tutores">Tutores</Link>
                    </div>
                </nav>
            </div>

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
                    element={
                        <PrivateRoute>
                            <CrearEstudiante />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/estudiantes/editar/:id"
                    element={
                        <PrivateRoute>
                            <EditarEstudiante />
                        </PrivateRoute>
                    }
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

                <Route
                    path="/planes"
                    element={
                        <PrivateRoute>
                            <PlanesPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/inscripciones"
                    element={
                        <PrivateRoute>
                            <InscripcionesPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/pagos"
                    element={
                        <PrivateRoute>
                            <PagosPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;