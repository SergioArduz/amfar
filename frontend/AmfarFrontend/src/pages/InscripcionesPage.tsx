import { useEffect, useState } from "react";
import { inscripcionesApi } from "../api/inscripcionesApi";
import { planesApi } from "../api/planesApi";
import { descuentosApi } from "../api/descuentosApi";
import { obtenerEstudiantes } from "../services/estudianteService";
import type { InscripcionDTO } from "../api/inscripcionesApi";
import type { PlanDTO } from "../api/planesApi";
import type { DescuentoDTO } from "../api/descuentosApi";
import type { Estudiante } from "../types/estudiante";
import { FileText, Plus, Trash2, Calendar, ClipboardList, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import InscripcionForm from "../components/inscripciones/InscripcionForm";

function InscripcionesPage() {
  const [inscripciones, setInscripciones] = useState<InscripcionDTO[]>([]);
  const [planes, setPlanes] = useState<PlanDTO[]>([]);
  const [descuentos, setDescuentos] = useState<DescuentoDTO[]>([]);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [cargando, setCargando] = useState(false);
  const [mostrarForm, setMostrarForm] = useState(false);

  const cargarDatos = async () => {
    setCargando(true);
    try {
      const [i, p, d, e] = await Promise.all([
        inscripcionesApi.obtenerTodas(),
        planesApi.obtenerActivos(),
        descuentosApi.obtenerActivos(),
        obtenerEstudiantes()
      ]);
      setInscripciones(i);
      setPlanes(p);
      setDescuentos(d);
      setEstudiantes(e);
    } catch {
      toast.error("Error al sincronizar datos académicos");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const guardarInscripcion = async (inscripcion: InscripcionDTO) => {
    try {
      await inscripcionesApi.crear(inscripcion);
      await cargarDatos();
      setMostrarForm(false);
      toast.success("Inscripción procesada correctamente");
    } catch {
      toast.error("Error al procesar la inscripción. Verifica horarios.");
    }
  };

  const eliminarInscripcion = async (codigo: string) => {
    if (window.confirm("¿Dar de baja esta inscripción? Se liberarán instrumentos y clases.")) {
      try {
        await inscripcionesApi.desactivar(codigo);
        await cargarDatos();
        toast.success("Inscripción desactivada");
      } catch {
        toast.error("No se pudo desactivar la inscripción");
      }
    }
  };

  const getNombreEstudiante = (codigo: string) => {
    const est = estudiantes.find(e => e.idPersona.toString() === codigo);
    return est ? `${est.nombre} ${est.apellido}` : codigo;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-amfar-black">Gestión Académica</h1>
          <p className="text-gray-500 font-medium">Inscripciones, asignación de horarios y planes de estudio.</p>
        </div>
        <button
          onClick={() => setMostrarForm(!mostrarForm)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${
            mostrarForm 
              ? "bg-amfar-black text-white" 
              : "bg-amfar-gold text-white shadow-amfar-gold/20"
          }`}
        >
          {mostrarForm ? <ClipboardList size={20} /> : <Plus size={20} />}
          {mostrarForm ? "Ver Listado" : "Nueva Inscripción"}
        </button>
      </div>

      {mostrarForm ? (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-in slide-in-from-top-4">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
            <div className="bg-amfar-gold/10 p-2 rounded-lg text-amfar-gold">
              <FileText size={24} />
            </div>
            <h2 className="text-xl font-bold text-amfar-black">Formulario de Inscripción</h2>
          </div>
          <InscripcionForm
            planes={planes}
            descuentos={descuentos}
            onGuardar={guardarInscripcion}
          />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {cargando ? (
            <div className="flex flex-col items-center justify-center p-20 gap-4">
              <Loader2 size={40} className="text-amfar-gold animate-spin" />
              <p className="text-gray-400 font-medium">Sincronizando registros...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr className="text-xs uppercase tracking-wider text-gray-500 font-bold">
                    <th className="px-6 py-4">Estudiante</th>
                    <th className="px-6 py-4">Plan / Descuento</th>
                    <th className="px-6 py-4">Modalidad</th>
                    <th className="px-6 py-4">Horarios</th>
                    <th className="px-6 py-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {inscripciones.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-20 text-center">
                        <div className="flex flex-col items-center gap-2 opacity-20">
                          <FileText size={64} />
                          <p className="text-xl font-bold">No hay inscripciones</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    inscripciones.map((i) => (
                      <tr key={i.codigo} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-amfar-black">{getNombreEstudiante(i.codigoEstudiante)}</div>
                          <div className="text-[10px] font-mono text-gray-400 uppercase tracking-tighter">REF: {i.codigo}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold">{i.codigoPlan}</div>
                          {i.codigoDescuento && (
                            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                              {i.codigoDescuento}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs px-2 py-1 rounded-lg font-bold ${
                            i.modalidad === 'Individual' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {i.modalidad}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            {i.clases.map((clase, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-[10px] text-gray-600 font-medium">
                                <Calendar size={12} className="text-amfar-gold" />
                                {clase.diaSemana}: {clase.horaInicio.slice(0, 5)} - {clase.horaFin.slice(0, 5)}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => eliminarInscripcion(i.codigo)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                            title="Dar de baja"
                          >
                            <Trash2 size={20} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default InscripcionesPage;
