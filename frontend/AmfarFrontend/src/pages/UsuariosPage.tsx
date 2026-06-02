import { useEffect, useState } from "react";
import { Users, Search, UserPlus, Shield, Eye, X, Check, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { usuariosApi, ROL_MAP, type UsuarioDTO, type CreateUsuarioRequest, type UpdateUsuarioRequest } from "../api/usuariosApi";

const initialCreate: CreateUsuarioRequest = {
  nombre: "", apellido: "", telefono: "", email: "", contrasena: "", rol: 1,
};

function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<UsuarioDTO[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [form, setForm] = useState<CreateUsuarioRequest>(initialCreate);
  const [guardando, setGuardando] = useState(false);

  const cargarUsuarios = async () => {
    setCargando(true);
    try {
      const data = await usuariosApi.obtenerTodos();
      setUsuarios(data);
    } catch {
      toast.error("Error al cargar usuarios");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { cargarUsuarios(); }, []);

  const abrirCrear = () => {
    setForm(initialCreate);
    setEditandoId(null);
    setShowModal(true);
  };

  const abrirEditar = async (id: number) => {
    try {
      const u = await usuariosApi.obtenerPorId(id);
      setForm({ nombre: u.nombre, apellido: u.apellido, telefono: u.telefono, email: u.email, contrasena: "", rol: u.rol });
      setEditandoId(id);
      setShowModal(true);
    } catch {
      toast.error("Error al cargar datos del usuario");
    }
  };

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.apellido.trim() || !form.email.trim()) {
      toast.error("Nombre, apellido y email son requeridos");
      return;
    }
    if (!editandoId && !form.contrasena.trim()) {
      toast.error("La contraseña es requerida para nuevos usuarios");
      return;
    }
    setGuardando(true);
    try {
      if (editandoId) {
        const payload: UpdateUsuarioRequest = { nombre: form.nombre, apellido: form.apellido, telefono: form.telefono, email: form.email, rol: form.rol };
        await usuariosApi.actualizar(editandoId, payload);
        toast.success("Usuario actualizado correctamente");
      } else {
        await usuariosApi.crear(form);
        toast.success("Usuario creado correctamente");
      }
      setShowModal(false);
      await cargarUsuarios();
    } catch (error: any) {
      toast.error(error?.response?.data?.mensaje || "Error al guardar el usuario");
    } finally {
      setGuardando(false);
    }
  };

  const toggleEstado = async (id: number, estadoActual: string) => {
    const accion = estadoActual === "Activo" ? "desactivar" : "activar";
    if (!window.confirm(`¿${accion === "desactivar" ? "Desactivar" : "Activar"} este usuario?`)) return;
    try {
      await usuariosApi.toggleEstado(id);
      toast.success(`Usuario ${accion}ado correctamente`);
      await cargarUsuarios();
    } catch {
      toast.error(`Error al ${accion} el usuario`);
    }
  };

  const usuariosFiltrados = usuarios.filter((u) =>
    `${u.nombre} ${u.apellido} ${u.email}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-amfar-black">Usuarios</h1>
          <p className="text-gray-500">Administra las cuentas de acceso al sistema.</p>
        </div>
        <button onClick={abrirCrear} className="btn-primary flex items-center justify-center gap-2 shadow-lg shadow-amfar-gold/20">
          <UserPlus size={20} /> Nuevo Usuario
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50 bg-gray-50/50">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Buscar por nombre o email..." className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-600 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">ID</th>
                <th className="px-6 py-4 font-semibold">Nombre</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Teléfono</th>
                <th className="px-6 py-4 font-semibold">Rol</th>
                <th className="px-6 py-4 font-semibold">Estado</th>
                <th className="px-6 py-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cargando ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={7} className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-full"></div></td>
                  </tr>
                ))
              ) : usuariosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <Users size={48} className="text-gray-200" />
                      <p>No se encontraron usuarios registrados.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                usuariosFiltrados.map((u) => (
                  <tr key={u.idUsuario} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">#{u.idUsuario}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-amfar-black">{u.nombre} {u.apellido}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{u.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{u.telefono || <span className="text-gray-300 italic">—</span>}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        <Shield size={12} /> {ROL_MAP[u.rol] || "Desconocido"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${u.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        {u.estado === "Activo" ? <Check size={12} /> : <X size={12} />}
                        {u.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => abrirEditar(u.idUsuario)} className="p-2 text-gray-400 hover:text-amfar-gold hover:bg-amfar-gold/10 rounded-lg transition-all" title="Editar">
                          <Eye size={18} />
                        </button>
                        <button onClick={() => toggleEstado(u.idUsuario, u.estado)} className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-500/10 rounded-lg transition-all" title={u.estado === "Activo" ? "Desactivar" : "Activar"}>
                          {u.estado === "Activo" ? <X size={18} /> : <Check size={18} />}
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

            <h2 className="text-xl font-bold text-amfar-black mb-6">
              {editandoId ? "Editar Usuario" : "Nuevo Usuario"}
            </h2>

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
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono</label>
                <input value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Rol *</label>
                <select value={form.rol} onChange={(e) => setForm({ ...form, rol: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm bg-white">
                  {Object.entries(ROL_MAP).map(([id, nombre]) => (
                    <option key={id} value={id}>{nombre}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Contraseña {editandoId ? "(dejar vacío para mantener)" : "*"}
                </label>
                <input type="password" value={form.contrasena} onChange={(e) => setForm({ ...form, contrasena: e.target.value })}
                  required={!editandoId}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm" />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => !guardando && setShowModal(false)} disabled={guardando}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all disabled:opacity-50">
                  Cancelar
                </button>
                <button type="submit" disabled={guardando}
                  className="px-4 py-2 text-sm font-medium text-white bg-amfar-gold hover:bg-yellow-600 rounded-xl transition-all shadow-lg shadow-amfar-gold/20 disabled:opacity-50 flex items-center gap-2">
                  {guardando && <Loader2 size={16} className="animate-spin" />}
                  {editandoId ? "Actualizar" : "Crear Usuario"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsuariosPage;
