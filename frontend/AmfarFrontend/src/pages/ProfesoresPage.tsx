import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { profesoresApi } from "../api/profesoresApi";
import { instrumentosApi } from "../api/instrumentosApi";
import type { ProfesorResponse, CrearProfesorRequest } from "../types/profesor";
import type { InstrumentoResponse } from "../types/instrumento";
import { UserPlus, Search, Edit2, Trash2, GraduationCap, Phone, Calendar, Loader2, X, Music } from "lucide-react";
import toast from "react-hot-toast";

function ProfesoresPage() {
  const navigate = useNavigate();
  const [profesores, setProfesores] = useState<ProfesorResponse[]>([]);
  const [instrumentos, setInstrumentos] = useState<InstrumentoResponse[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const [form, setForm] = useState<CrearProfesorRequest>({
    nombre: "", apellido: "", telefono: "", idsInstrumentos: [],
  });

  const cargarProfesores = async () => {
    setCargando(true);
    try {
      const data = await profesoresApi.obtenerTodos();
      setProfesores(data);
    } catch {
      toast.error("Error al cargar la lista de profesores");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProfesores();
    instrumentosApi.obtenerTodos().then(setInstrumentos).catch(() => {});
  }, []);

  const abrirCrear = () => {
    setForm({ nombre: "", apellido: "", telefono: "", idsInstrumentos: [] });
    setEditandoId(null);
    setShowModal(true);
  };

  const abrirEditar = (p: ProfesorResponse) => {
    setForm({ nombre: p.nombre, apellido: p.apellido, telefono: p.telefono, idsInstrumentos: p.especialidades.map(e => e.idInstrumento) });
    setEditandoId(p.idProfesor);
    setShowModal(true);
  };

  const toggleInstrumento = (id: number) => {
    setForm((prev) => ({
      ...prev,
      idsInstrumentos: prev.idsInstrumentos.includes(id)
        ? prev.idsInstrumentos.filter((i) => i !== id)
        : [...prev.idsInstrumentos, id],
    }));
  };

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.apellido.trim()) {
      toast.error("Nombre y apellido son requeridos");
      return;
    }
    setGuardando(true);
    try {
      if (editandoId) {
        await profesoresApi.actualizar(editandoId, { nombre: form.nombre, apellido: form.apellido, telefono: form.telefono, idsInstrumentos: form.idsInstrumentos });
        toast.success("Profesor actualizado correctamente");
      } else {
        await profesoresApi.crear(form);
        toast.success("Profesor creado correctamente");
      }
      setShowModal(false);
      await cargarProfesores();
    } catch {
      toast.error(editandoId ? "Error al actualizar el profesor" : "Error al crear el profesor");
    } finally {
      setGuardando(false);
    }
  };

  const handleToggleEstado = async (id: number) => {
    try {
      await profesoresApi.toggleEstado(id);
      toast.success("Estado del profesor actualizado");
      cargarProfesores();
    } catch {
      toast.error("Error al cambiar el estado del profesor");
    }
  };

  const profesoresFiltrados = profesores.filter(
    (p) =>
      p.nombreCompleto.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.especialidades.some((e) => e.nombreInstrumento.toLowerCase().includes(busqueda.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-amfar-black">Cuerpo Docente</h1>
          <p className="text-gray-500 font-medium">Administra los perfiles de los profesores y sus especialidades musicales.</p>
        </div>
        <button onClick={abrirCrear} className="bg-amfar-gold text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-amfar-gold/20 hover:scale-[1.02] transition-all">
          <UserPlus size={20} /> Nuevo Profesor
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50 bg-gray-50/50">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Buscar por nombre o instrumento..." className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-600 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Profesor</th>
                <th className="px-6 py-4 font-semibold">Contacto</th>
                <th className="px-6 py-4 font-semibold">Especialidades</th>
                <th className="px-6 py-4 font-semibold">Estado</th>
                <th className="px-6 py-4 font-semibold">Miembro desde</th>
                <th className="px-6 py-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cargando ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 size={40} className="text-amfar-gold animate-spin" />
                      <p className="text-gray-400 font-medium">Sincronizando equipo docente...</p>
                    </div>
                  </td>
                </tr>
              ) : profesoresFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <GraduationCap size={48} className="text-gray-200" />
                      <p>No se encontraron profesores registrados.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                profesoresFiltrados.map((p) => (
                  <tr key={p.idProfesor} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-amfar-gold/10 flex items-center justify-center text-amfar-gold font-bold">
                          {p.nombreCompleto.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-bold text-amfar-black">{p.nombreCompleto}</div>
                          <div className="text-[10px] text-gray-400 font-mono">ID: PROF-{p.idProfesor.toString().padStart(4, '0')}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone size={14} className="text-gray-400" /> {p.telefono}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {p.especialidades.map(esp => (
                          <span key={esp.idInstrumento} className="text-[10px] font-bold bg-amfar-gold/5 text-amfar-goldDark border border-amfar-gold/10 px-2 py-0.5 rounded-md">
                            {esp.nombreInstrumento}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleToggleEstado(p.idProfesor)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold transition-all ${p.estado === 'Activo' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${p.estado === 'Activo' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        {p.estado}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                        <Calendar size={14} className="text-gray-300" /> {new Date(p.fechaRegistro).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => abrirEditar(p)}
                          className="p-2 text-gray-400 hover:text-amfar-gold hover:bg-amfar-gold/10 rounded-lg transition-all" title="Editar">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleToggleEstado(p.idProfesor)}
                          className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-500/10 rounded-lg transition-all" title={p.estado === "Activo" ? "Desactivar" : "Activar"}>
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

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => !guardando && setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => !guardando && setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors" disabled={guardando}>
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-amfar-black mb-6">{editandoId ? "Editar Profesor" : "Nuevo Profesor"}</h2>

            <form onSubmit={guardar} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre *</label>
                  <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Apellido *</label>
                  <input value={form.apellido} onChange={(e) => setForm({ ...form, apellido: e.target.value })} required
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono</label>
                <input value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Especialidades (instrumentos que enseña)</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {instrumentos.map((inst) => {
                    const selected = form.idsInstrumentos.includes(inst.idInstrumento);
                    return (
                      <button key={inst.idInstrumento} type="button" onClick={() => toggleInstrumento(inst.idInstrumento)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          selected ? "bg-amfar-gold text-white border-amfar-gold" : "bg-gray-50 text-gray-600 border-gray-200 hover:border-amfar-gold"
                        }`}>
                        <Music size={14} /> {inst.nombre}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => !guardando && setShowModal(false)} disabled={guardando}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all disabled:opacity-50">Cancelar</button>
                <button type="submit" disabled={guardando}
                  className="px-4 py-2 text-sm font-medium text-white bg-amfar-gold hover:bg-yellow-600 rounded-xl transition-all shadow-lg shadow-amfar-gold/20 disabled:opacity-50 flex items-center gap-2">
                  {guardando && <Loader2 size={16} className="animate-spin" />}
                  {guardando ? "Guardando..." : editandoId ? "Actualizar Profesor" : "Crear Profesor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfesoresPage;
