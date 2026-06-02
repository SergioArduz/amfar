import { useEffect, useState } from "react";
import { obtenerEstudiantes, eliminarEstudiante } from "../services/estudianteService";
import { Estudiante } from "../types/estudiante";
import { useNavigate } from "react-router-dom";
import { UserPlus, Search, Edit2, Trash2, Users, Music } from "lucide-react";
import toast from "react-hot-toast";

function Estudiantes() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  const cargarEstudiantes = async () => {
    setCargando(true);
    try {
      const data = await obtenerEstudiantes();
      setEstudiantes(data);
    } catch {
      toast.error("Error al cargar la lista de estudiantes");
    } finally {
      setCargando(false);
    }
  };

  const handleEliminar = async (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este estudiante? Esta acción no se puede deshacer.")) {
      try {
        await eliminarEstudiante(id);
        toast.success("Estudiante eliminado correctamente");
        cargarEstudiantes();
      } catch {
        toast.error("Error al eliminar el estudiante");
      }
    }
  };

  const estudiantesFiltrados = estudiantes.filter(
    (e) =>
      `${e.nombre} ${e.apellido}`.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.idPersona.toString().includes(busqueda)
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-amfar-black">Estudiantes</h1>
          <p className="text-gray-500">Administra el registro de alumnos y sus tutores legales.</p>
        </div>
        <button
          onClick={() => navigate("/estudiantes/nuevo")}
          className="btn-primary flex items-center justify-center gap-2 shadow-lg shadow-amfar-gold/20"
        >
          <UserPlus size={20} />
          Nuevo Estudiante
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
                <th className="px-6 py-4 font-semibold">Estudiante</th>
                <th className="px-6 py-4 font-semibold">Contacto</th>
                <th className="px-6 py-4 font-semibold">Instrumento</th>
                <th className="px-6 py-4 font-semibold">Tutores</th>
                <th className="px-6 py-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cargando ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={6} className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-full"></div></td>
                  </tr>
                ))
              ) : estudiantesFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <Users size={48} className="text-gray-200" />
                      <p>No se encontraron estudiantes registrados.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                estudiantesFiltrados.map((e) => (
                  <tr key={e.idPersona} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        #{e.idPersona}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-amfar-black">{e.nombre} {e.apellido}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {e.telefono}
                    </td>
                    <td className="px-6 py-4">
                      {e.tieneInstrumento ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Music size={12} /> Propio
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Requerido
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {e.tutores.length > 0 ? (
                        <div className="flex">
                          {e.tutores.map((t, i) => (
                            <div 
                              key={i} 
                              title={`${t.nombre || ''} ${t.apellido || ''}`}
                              className={`inline-flex h-8 w-8 rounded-full ring-2 ring-white bg-amfar-gold items-center justify-center text-[10px] text-white font-bold ${i > 0 ? '-ml-2' : ''}`}
                            >
                              {(t.nombre || '?')[0]}{(t.apellido || '')[0] || '?'}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-300 italic">Ninguno</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => navigate(`/estudiantes/editar/${e.idPersona}`)}
                          className="p-2 text-gray-400 hover:text-amfar-gold hover:bg-amfar-gold/10 rounded-lg transition-all"
                          title="Editar"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleEliminar(e.idPersona)}
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

export default Estudiantes;
