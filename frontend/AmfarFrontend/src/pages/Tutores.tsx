import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerTutores, eliminarTutor } from "../services/tutorService";
import type { Tutor } from "../types/tutor";
import { UserPlus, Search, Edit2, Trash2, Users } from "lucide-react";
import toast from "react-hot-toast";

function Tutores() {
  const navigate = useNavigate();
  const [tutores, setTutores] = useState<Tutor[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    cargarTutores();
  }, []);

  const cargarTutores = async () => {
    setCargando(true);
    try {
      const data = await obtenerTutores();
      setTutores(data);
    } catch {
      toast.error("Error al cargar la lista de tutores");
    } finally {
      setCargando(false);
    }
  };

  const handleEliminar = async (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar este tutor?")) {
      try {
        await eliminarTutor(id);
        toast.success("Tutor eliminado correctamente");
        cargarTutores();
      } catch {
        toast.error("Error al eliminar el tutor");
      }
    }
  };

  const tutoresFiltrados = tutores.filter(
    (t) =>
      `${t.nombre} ${t.apellido}`.toLowerCase().includes(busqueda.toLowerCase()) ||
      t.idPersona.toString().includes(busqueda)
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-amfar-black">Tutores</h1>
          <p className="text-gray-500">Administra los tutores legales de los estudiantes.</p>
        </div>
        <button
          onClick={() => navigate("/tutores/nuevo")}
          className="btn-primary flex items-center justify-center gap-2 shadow-lg shadow-amfar-gold/20"
        >
          <UserPlus size={20} />
          Nuevo Tutor
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50 bg-gray-50/50">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por nombre o ID..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-600 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">ID</th>
                <th className="px-6 py-4 font-semibold">Nombre Completo</th>
                <th className="px-6 py-4 font-semibold">Teléfono</th>
                <th className="px-6 py-4 font-semibold">Parentesco</th>
                <th className="px-6 py-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cargando ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-full"></div></td>
                  </tr>
                ))
              ) : tutoresFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <Users size={48} className="text-gray-200" />
                      <p>No se encontraron tutores registrados.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                tutoresFiltrados.map((t) => (
                  <tr key={t.idPersona} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        #{t.idPersona}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-amfar-black">{t.nombre} {t.apellido}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{t.telefono}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {t.parentesco}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => navigate(`/tutores/editar/${t.idPersona}`)}
                          className="p-2 text-gray-400 hover:text-amfar-gold hover:bg-amfar-gold/10 rounded-lg transition-all"
                          title="Editar"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleEliminar(t.idPersona)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                          title="Eliminar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Tutores;
