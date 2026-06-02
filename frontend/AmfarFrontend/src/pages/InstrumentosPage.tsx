import { useEffect, useState } from "react";
import { instrumentosApi } from "../api/instrumentosApi";
import type { InstrumentoResponse } from "../types/instrumento";
import { Plus, Search, Edit2, Trash2, Music, Package, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function InstrumentosPage() {
  const [instrumentos, setInstrumentos] = useState<InstrumentoResponse[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(false);
  const [mostrarForm, setMostrarForm] = useState(false);

  const cargarInstrumentos = async () => {
    setCargando(true);
    try {
      const data = await instrumentosApi.obtenerTodos();
      setInstrumentos(data);
    } catch {
      toast.error("Error al cargar el inventario de instrumentos");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarInstrumentos();
  }, []);

  const handleToggleEstado = async (id: number, estadoActual: string) => {
    const nuevoEstado = estadoActual === "Activo" ? "Mantenimiento" : "Activo";
    try {
      await instrumentosApi.cambiarEstado(id, { estado: nuevoEstado });
      toast.success(`Instrumento marcado como ${nuevoEstado}`);
      cargarInstrumentos();
    } catch {
      toast.error("Error al cambiar el estado del instrumento");
    }
  };

  const instrumentosFiltrados = instrumentos.filter(
    (i) =>
      i.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      i.tipo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-amfar-black">Inventario de Instrumentos</h1>
          <p className="text-gray-500 font-medium">Gestión de stock, mantenimiento y disponibilidad de recursos físicos.</p>
        </div>
        <button
          onClick={() => setMostrarForm(true)}
          className="bg-amfar-gold text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-amfar-gold/20 hover:scale-[1.02] transition-all"
        >
          <Plus size={20} />
          Nuevo Instrumento
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por nombre o tipo..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <div className="text-center px-4 border-r border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total</p>
              <p className="text-xl font-bold text-amfar-black">{instrumentos.length}</p>
            </div>
            <div className="text-center px-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Disponibles</p>
              <p className="text-xl font-bold text-green-600">{instrumentos.filter(i => i.stockDisponible > 0).length}</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-600 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Instrumento</th>
                <th className="px-6 py-4 font-semibold">Tipo</th>
                <th className="px-6 py-4 font-semibold">Stock</th>
                <th className="px-6 py-4 font-semibold">Estado</th>
                <th className="px-6 py-4 font-semibold">Registro</th>
                <th className="px-6 py-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cargando ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 size={40} className="text-amfar-gold animate-spin" />
                      <p className="text-gray-400 font-medium">Sincronizando inventario...</p>
                    </div>
                  </td>
                </tr>
              ) : instrumentosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <Package size={48} className="text-gray-200" />
                      <p>No se encontraron instrumentos.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                instrumentosFiltrados.map((i) => (
                  <tr key={i.idInstrumento} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-amfar-gold/10 p-2 rounded-lg text-amfar-gold">
                          <Music size={18} />
                        </div>
                        <div>
                          <div className="font-bold text-amfar-black">{i.nombre}</div>
                          <div className="text-[10px] text-gray-400 font-mono">REF: INST-{i.idInstrumento.toString().padStart(4, '0')}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-lg">
                        {i.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden max-w-[80px]">
                          <div 
                            className={`h-full rounded-full ${i.stockDisponible === 0 ? 'bg-red-500' : 'bg-amfar-gold'}`}
                            style={{ width: `${(i.stockDisponible / i.stockTotal) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-bold text-amfar-black">
                          {i.stockDisponible}/{i.stockTotal}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleToggleEstado(i.idInstrumento, i.estado)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold transition-all ${
                        i.estado === 'Activo' 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                          : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${i.estado === 'Activo' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                        {i.estado}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500 font-medium">
                      {new Date(i.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-2 text-gray-400 hover:text-amfar-gold hover:bg-amfar-gold/10 rounded-lg transition-all"
                          title="Editar"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                          title="Dar de baja"
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
