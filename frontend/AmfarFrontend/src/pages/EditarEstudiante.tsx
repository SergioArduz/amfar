import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obtenerEstudiantePorId, actualizarEstudiante } from "../services/estudianteService";
import { obtenerTutores } from "../services/tutorService";
import type { Tutor } from "../types/tutor";
import toast from "react-hot-toast";
import { UserPlus, Search, Check, X, Loader2, Music, Users, Edit } from "lucide-react";

function EditarEstudiante() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [tieneInstrumento, setTieneInstrumento] = useState(false);
    const [idsTutores, setIdsTutores] = useState<number[]>([]);
    
    const [tutores, setTutores] = useState<Tutor[]>([]);
    const [busquedaTutor, setBusquedaTutor] = useState("");
    const [cargandoDatos, setCargandoDatos] = useState(true);
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        const cargarData = async () => {
            setCargandoDatos(true);
            try {
                const [estudiante, listaTutores] = await Promise.all([
                    obtenerEstudiantePorId(Number(id)),
                    obtenerTutores()
                ]);

                setNombre(estudiante.nombre);
                setApellido(estudiante.apellido);
                setTelefono(estudiante.telefono);
                setTieneInstrumento(estudiante.tieneInstrumento);
                setIdsTutores(estudiante.tutores.map((t: any) => t.idTutor));
                setTutores(listaTutores);
            } catch {
                toast.error("Error al sincronizar datos del estudiante");
            } finally {
                setCargandoDatos(false);
            }
        };
        cargarData();
    }, [id]);

    const toggleTutor = (idTutor: number) => {
        setIdsTutores(prev => 
            prev.includes(idTutor) 
                ? prev.filter(tId => tId !== idTutor) 
                : [...prev, idTutor]
        );
    };

    const guardar = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nombre.trim() || !apellido.trim()) {
            toast.error("Nombre y apellido son requeridos");
            return;
        }

        setGuardando(true);
        try {
            await actualizarEstudiante(Number(id), {
                nombre,
                apellido,
                telefono,
                tieneInstrumento,
                idsTutores
            });

            toast.success("Estudiante actualizado correctamente");
            navigate("/estudiantes");
        } catch (error) {
            console.error(error);
            toast.error("Error al actualizar el estudiante");
        } finally {
            setGuardando(false);
        }
    };

    const tutoresFiltrados = tutores.filter(t => 
        `${t.nombre} ${t.apellido}`.toLowerCase().includes(busquedaTutor.toLowerCase())
    );

    if (cargandoDatos) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 size={48} className="text-amfar-gold animate-spin" />
                <p className="text-gray-500 font-bold animate-pulse text-lg tracking-widest uppercase">Cargando expediente...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold text-amfar-black flex items-center gap-3">
                    <Edit className="text-amfar-gold" /> Actualizar Expediente de Estudiante
                </h1>
                <p className="text-gray-500 font-medium">Modifica la información básica o actualiza los tutores responsables.</p>
            </div>

            <form onSubmit={guardar} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Información Básica */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
                        <Users size={18} className="text-amfar-gold" />
                        <h2 className="font-bold text-amfar-black">Información Personal</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Nombre *</label>
                            <input
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Apellido *</label>
                            <input
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Teléfono</label>
                            <input
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all"
                                placeholder="Ej: 77123456"
                            />
                        </div>

                        <div className="pt-2">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${tieneInstrumento ? 'bg-amfar-gold border-amfar-gold' : 'border-gray-200 group-hover:border-amfar-gold'}`}>
                                    {tieneInstrumento && <Check size={16} className="text-white" />}
                                </div>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={tieneInstrumento}
                                    onChange={(e) => setTieneInstrumento(e.target.checked)}
                                />
                                <div className="flex items-center gap-2">
                                    <Music size={16} className={tieneInstrumento ? "text-amfar-gold" : "text-gray-400"} />
                                    <span className="text-sm font-semibold text-gray-700">El alumno posee instrumento propio</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Asignación de Tutores */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col space-y-4 h-[500px]">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-50">
                        <div className="flex items-center gap-2">
                            <UserPlus size={18} className="text-amfar-gold" />
                            <h2 className="font-bold text-amfar-black">Tutores Responsables</h2>
                        </div>
                        <span className="bg-amfar-gold/10 text-amfar-gold px-2 py-0.5 rounded-full text-xs font-bold">
                            {idsTutores.length} Seleccionados
                        </span>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Buscar tutor..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm"
                            value={busquedaTutor}
                            onChange={(e) => setBusquedaTutor(e.target.value)}
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                        {tutoresFiltrados.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center p-4">
                                <p className="text-gray-400 text-sm italic">No se encontraron tutores.</p>
                            </div>
                        ) : (
                            tutoresFiltrados.map(tutor => (
                                <div 
                                    key={tutor.idPersona}
                                    onClick={() => toggleTutor(tutor.idPersona)}
                                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                                        idsTutores.includes(tutor.idPersona)
                                            ? 'bg-amfar-gold/5 border-amfar-gold'
                                            : 'bg-white border-gray-100 hover:border-amfar-gold/30 hover:bg-gray-50'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                                            idsTutores.includes(tutor.idPersona)
                                                ? 'bg-amfar-gold text-white'
                                                : 'bg-gray-100 text-gray-400 group-hover:bg-amfar-gold/20 group-hover:text-amfar-gold'
                                        }`}>
                                            {tutor.nombre[0]}{tutor.apellido[0]}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-amfar-black leading-none mb-1">{tutor.nombre} {tutor.apellido}</p>
                                            <p className="text-[10px] text-gray-500 font-medium">{tutor.parentesco}</p>
                                        </div>
                                    </div>
                                    {idsTutores.includes(tutor.idPersona) && (
                                        <div className="bg-amfar-gold text-white p-1 rounded-full shadow-sm">
                                            <Check size={12} strokeWidth={4} />
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Botones de acción */}
                <div className="md:col-span-2 flex items-center justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate("/estudiantes")}
                        className="px-8 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all flex items-center gap-2"
                        disabled={guardando}
                    >
                        <X size={20} /> Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-12 py-3 bg-amfar-black text-white rounded-xl font-bold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
                        disabled={guardando}
                    >
                        {guardando ? <Loader2 size={20} className="animate-spin" /> : <Check size={20} />}
                        {guardando ? "Actualizando..." : "Guardar Cambios"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditarEstudiante;