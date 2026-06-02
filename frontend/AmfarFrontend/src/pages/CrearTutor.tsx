import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearTutor } from "../services/tutorService";
import { ArrowLeft, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function CrearTutor() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [parentesco, setParentesco] = useState("");
  const [cargando, setCargando] = useState(false);

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !apellido.trim()) {
      toast.error("Nombre y apellido son requeridos");
      return;
    }
    setCargando(true);
    try {
      await crearTutor({ nombre, apellido, telefono, parentesco });
      toast.success("Tutor creado correctamente");
      navigate("/tutores");
    } catch {
      toast.error("Error al crear el tutor");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <button onClick={() => navigate("/tutores")} className="flex items-center gap-2 text-sm text-gray-500 hover:text-amfar-gold mb-6 transition-colors">
          <ArrowLeft size={16} /> Volver a tutores
        </button>

        <h1 className="text-2xl font-bold text-amfar-black text-center mb-8">Nuevo Tutor</h1>

        <form onSubmit={guardar} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre *</label>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Apellido *</label>
            <input value={apellido} onChange={(e) => setApellido(e.target.value)} required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono</label>
            <input value={telefono} onChange={(e) => setTelefono(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Parentesco</label>
            <input value={parentesco} onChange={(e) => setParentesco(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm" />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => navigate("/tutores")} disabled={cargando}
              className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all disabled:opacity-50">
              Cancelar
            </button>
            <button type="submit" disabled={cargando}
              className="px-5 py-2.5 text-sm font-medium text-white bg-amfar-gold hover:bg-yellow-600 rounded-xl transition-all shadow-lg shadow-amfar-gold/20 disabled:opacity-50 flex items-center gap-2">
              {cargando && <Loader2 size={16} className="animate-spin" />}
              {cargando ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CrearTutor;
