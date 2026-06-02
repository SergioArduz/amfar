import { useState, useEffect } from "react";
import type {
  InscripcionDTO,
  ClaseInscripcionDTO,
} from "../../api/inscripcionesApi";
import type { PlanDTO } from "../../api/planesApi";
import type { DescuentoDTO } from "../../api/descuentosApi";
import { obtenerEstudiantes } from "../../services/estudianteService";
import { profesoresApi } from "../../api/profesoresApi";
import { instrumentosApi } from "../../api/instrumentosApi";
import type { Estudiante } from "../../types/estudiante";
import type { ProfesorResponse } from "../../types/profesor";
import type { InstrumentoResponse } from "../../types/instrumento";
import { Search, Calendar, User, Users, Music, GraduationCap, Check, X, Loader2, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  planes: PlanDTO[];
  descuentos: DescuentoDTO[];
  onGuardar: (inscripcion: InscripcionDTO) => void;
}

function InscripcionForm({ planes, descuentos, onGuardar }: Props) {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [profesores, setProfesores] = useState<ProfesorResponse[]>([]);
  const [instrumentos, setInstrumentos] = useState<InstrumentoResponse[]>([]);
  const [cargandoData, setCargandoData] = useState(true);

  const [form, setForm] = useState<InscripcionDTO>({
    codigo: `INS-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    fechaInicio: new Date().toISOString().split('T')[0],
    fechaFin: null,
    modalidad: "Individual",
    codigoEstudiante: "",
    codigoPlan: planes[0]?.codigo || "",
    codigoDescuento: null,
    clases: [],
  });

  const [claseNueva, setClaseNueva] = useState<ClaseInscripcionDTO>({
    codigoProfesor: "",
    codigoInstrumento: "",
    instrumentoPrestado: false,
    diaSemana: "Lunes",
    horaInicio: "08:00",
    horaFin: "09:00",
  });

  useEffect(() => {
    const cargarTodo = async () => {
      setCargandoData(true);
      try {
        const [e, p, i] = await Promise.all([
          obtenerEstudiantes(),
          profesoresApi.obtenerTodos("Activo"),
          instrumentosApi.obtenerTodos()
        ]);
        setEstudiantes(e);
        setProfesores(p);
        setInstrumentos(i);
      } catch {
        toast.error("Error al cargar datos para la inscripción");
      } finally {
        setCargandoData(false);
      }
    };
    cargarTodo();
  }, []);

  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "codigoDescuento" ? (value === "" ? null : value) : value,
    }));
  };

  const manejarClaseNueva = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setClaseNueva((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const agregarClase = () => {
    if (!claseNueva.codigoProfesor) {
      toast.error("Selecciona un profesor para la clase");
      return;
    }
    
    setForm(prev => ({
      ...prev,
      clases: [...prev.clases, { ...claseNueva }]
    }));
    
    toast.success("Clase agregada al itinerario");
  };

  const quitarClase = (index: number) => {
    setForm(prev => ({
      ...prev,
      clases: prev.clases.filter((_, i) => i !== index)
    }));
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.codigoEstudiante) {
      toast.error("Selecciona un estudiante.");
      return;
    }

    if (!form.codigoPlan) {
      toast.error("Selecciona un plan.");
      return;
    }

    if (form.clases.length === 0) {
      toast.error("Debes agregar al menos una clase.");
      return;
    }

    const inscripcionEnviar: InscripcionDTO = {
      ...form,
      fechaInicio: `${form.fechaInicio}T00:00:00Z`,
      fechaFin: form.fechaFin ? `${form.fechaFin}T00:00:00Z` : null,
      clases: form.clases.map(c => ({
        ...c,
        codigoInstrumento: c.codigoInstrumento || null,
        horaInicio: c.horaInicio.length === 5 ? `${c.horaInicio}:00` : c.horaInicio,
        horaFin: c.horaFin.length === 5 ? `${c.horaFin}:00` : c.horaFin,
      }))
    };

    onGuardar(inscripcionEnviar);
  };

  if (cargandoData) {
    return (
      <div className="flex flex-col items-center justify-center p-12 gap-4">
        <Loader2 className="text-amfar-gold animate-spin" size={32} />
        <p className="text-gray-400 font-bold tracking-widest uppercase text-xs">Preparando sistema de inscripción...</p>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Estudiante */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <User size={16} className="text-amfar-gold" /> Estudiante *
          </label>
          <select
            name="codigoEstudiante"
            value={form.codigoEstudiante}
            onChange={manejarCambio}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all"
            required
          >
            <option value="">Seleccionar Alumno</option>
            {estudiantes.map(e => (
              <option key={e.idPersona} value={e.idPersona}>
                {e.nombre} {e.apellido}
              </option>
            ))}
          </select>
        </div>

        {/* Plan */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <Music size={16} className="text-amfar-gold" /> Plan Académico *
          </label>
          <select
            name="codigoPlan"
            value={form.codigoPlan}
            onChange={manejarCambio}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all"
            required
          >
            <option value="">Seleccionar Plan</option>
            {planes.map(p => (
              <option key={p.codigo} value={p.codigo}>
                {p.nombrePlan} - Bs. {p.monto}
              </option>
            ))}
          </select>
        </div>

        {/* Descuento */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <Check size={16} className="text-amfar-gold" /> Beneficio / Descuento
          </label>
          <select
            name="codigoDescuento"
            value={form.codigoDescuento ?? ""}
            onChange={manejarCambio}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all"
          >
            <option value="">Precio Regular</option>
            {descuentos.map(d => (
              <option key={d.codigo} value={d.codigo}>
                {d.nombreDescuento} (-{d.porcentaje}%)
              </option>
            ))}
          </select>
        </div>

        {/* Modalidad */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <Users size={16} className="text-amfar-gold" /> Modalidad
          </label>
          <select
            name="modalidad"
            value={form.modalidad}
            onChange={manejarCambio}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all"
          >
            <option value="Individual">Individual</option>
            <option value="Grupal">Grupal</option>
          </select>
        </div>

        {/* Fecha Inicio */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <Calendar size={16} className="text-amfar-gold" /> Fecha Inicio *
          </label>
          <input
            type="date"
            name="fechaInicio"
            value={form.fechaInicio}
            onChange={manejarCambio}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all"
            required
          />
        </div>

        {/* Fecha Fin */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <Calendar size={16} className="text-amfar-gold" /> Fecha Fin (Opcional)
          </label>
          <input
            type="date"
            name="fechaFin"
            value={form.fechaFin ?? ""}
            onChange={manejarCambio}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all"
          />
        </div>
      </div>

      {/* Sección de Clases */}
      <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-200 space-y-6">
        <h3 className="font-bold text-amfar-black flex items-center gap-2">
            <Plus size={18} className="text-amfar-gold" /> Programación de Clases
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Profesor</label>
            <select
              name="codigoProfesor"
              value={claseNueva.codigoProfesor}
              onChange={manejarClaseNueva}
              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-amfar-gold"
            >
              <option value="">Seleccionar</option>
              {profesores.map(p => (
                <option key={p.idProfesor} value={p.idProfesor}>{p.nombreCompleto}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Instrumento</label>
            <select
              name="codigoInstrumento"
              value={claseNueva.codigoInstrumento || ""}
              onChange={manejarClaseNueva}
              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-amfar-gold"
            >
              <option value="">Canto / Otro</option>
              {instrumentos.map(i => (
                <option key={i.idInstrumento} value={i.idInstrumento}>{i.nombre}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Día</label>
            <select
              name="diaSemana"
              value={claseNueva.diaSemana}
              onChange={manejarClaseNueva}
              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-amfar-gold"
            >
              {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Inicio</label>
            <input
              type="time"
              name="horaInicio"
              value={claseNueva.horaInicio}
              onChange={manejarClaseNueva}
              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-amfar-gold"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Fin</label>
            <input
              type="time"
              name="horaFin"
              value={claseNueva.horaFin}
              onChange={manejarClaseNueva}
              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-amfar-gold"
            />
          </div>

          <div className="flex items-end pb-0.5">
            <button
              type="button"
              onClick={agregarClase}
              className="w-full py-1.5 bg-amfar-gold text-white rounded-lg text-xs font-bold hover:bg-amfar-goldDark transition-colors"
            >
              Añadir
            </button>
          </div>
        </div>

        {/* Listado de clases agregadas */}
        <div className="space-y-2">
          {form.clases.length === 0 ? (
            <p className="text-center text-xs text-gray-400 italic py-4">No hay clases programadas para esta inscripción.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {form.clases.map((clase, idx) => {
                const prof = profesores.find(p => p.idProfesor.toString() === clase.codigoProfesor);
                const inst = instrumentos.find(i => i.idInstrumento.toString() === clase.codigoInstrumento);
                return (
                  <div key={idx} className="bg-white p-3 rounded-xl border border-gray-100 flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="bg-amfar-gold/10 p-2 rounded-lg text-amfar-gold">
                        <GraduationCap size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-amfar-black">{prof?.nombreCompleto || 'Profesor'}</p>
                        <p className="text-[10px] text-gray-500">{clase.diaSemana}: {clase.horaInicio} - {clase.horaFin} | {inst?.nombre || 'Canto'}</p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => quitarClase(idx)}
                      className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="submit"
          className="px-8 py-3 bg-amfar-black text-white rounded-xl font-bold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center gap-2"
          disabled={form.clases.length === 0}
        >
          <Check size={20} /> Confirmar Inscripción Académica
        </button>
      </div>
    </form>
  );
}

export default InscripcionForm;