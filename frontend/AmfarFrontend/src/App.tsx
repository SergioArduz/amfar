import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

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
          </div>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/planes" />} />
        <Route path="/planes" element={<PlanesPage />} />
        <Route path="/inscripciones" element={<InscripcionesPage />} />
        <Route path="/pagos" element={<PagosPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;