import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useLocation,
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
import Dashboard from "./pages/Dashboard";
import Calendario from "./pages/Calendario";
import InstrumentosPage from "./pages/InstrumentosPage";
import ProfesoresPage from "./pages/ProfesoresPage";
import { Layout } from "./components/Layout";

// Wrapper para manejar el Layout solo en rutas protegidas
function AppContent() {
    const location = useLocation();
    const isLoginPage = location.pathname === "/";

    if (isLoginPage) {
        return (
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        );
    }

    return (
        <Layout>
            <Routes>
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/calendario"
                    element={
                        <PrivateRoute>
                            <Calendario />
                        </PrivateRoute>
                    }
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
                    path="/profesores"
                    element={
                        <PrivateRoute>
                            <ProfesoresPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/instrumentos"
                    element={
                        <PrivateRoute>
                            <InstrumentosPage />
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
                
                {/* Fallback for authenticated users */}
                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        </Layout>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;
