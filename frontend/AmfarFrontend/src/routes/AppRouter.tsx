import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import PagosPage from "../pages/PagosPage";
import RecibosPage from "../pages/RecibosPage";
import CalendarioPage from "../pages/CalendarioPage";
import MisAlumnosPage from "../pages/MisAlumnosPage";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />

            <Route path="/pagos" element={<PagosPage />} />

            <Route path="/recibos" element={<RecibosPage />} />

            <Route path="/calendario" element={<CalendarioPage />} />

            <Route
                path="/mis-alumnos"
                element={<MisAlumnosPage />}
            />
        </Routes>
    );
}