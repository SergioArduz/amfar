import { useEffect, useState, useMemo } from "react";
import { Calendar as CalendarIcon, Filter, Music, Clock, User, ChevronDown, ChevronUp, School } from "lucide-react";
import api from "../services/api";
import toast from "react-hot-toast";
import { profesoresApi } from "../api/profesoresApi";
import type { ProfesorResponse } from "../types/profesor";

interface CalendarioClase {
  codigoInscripcion: string;
  diaSemana: string;
  horaInicio: string;
  horaFin: string;
  codigoProfesor: string;
  codigoInstrumento: string;
  instrumentoPrestado: boolean;
  estado: string;
}

const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const HORAS = Array.from({ length: 13 }, (_, i) => i + 8);

const colorProfesores = [
  "border-l-blue-500 bg-blue-50",
  "border-l-emerald-500 bg-emerald-50",
  "border-l-purple-500 bg-purple-50",
  "border-l-rose-500 bg-rose-50",
  "border-l-amber-500 bg-amber-50",
  "border-l-cyan-500 bg-cyan-50",
  "border-l-teal-500 bg-teal-50",
  "border-l-orange-500 bg-orange-50",
  "border-l-indigo-500 bg-indigo-50",
  "border-l-pink-500 bg-pink-50",
];

export default function Calendario() {
  const [clases, setClases] = useState<CalendarioClase[]>([]);
  const [cargando, setCargando] = useState(true);
  const [profesores, setProfesores] = useState<ProfesorResponse[]>([]);
  const [filtroProfesorId, setFiltroProfesorId] = useState("");
  const [mostrarHorasLibres, setMostrarHorasLibres] = useState(false);
  const [profesorColors] = useState<Record<string, string>>({});

  useEffect(() => {
    async function cargarCalendario() {
      try {
        const params: Record<string, string> = {};
        if (filtroProfesorId) params.profesorId = filtroProfesorId;
        const response = await api.get("/calendario", { params });
        setClases(response.data);
      } catch {
        toast.error("Error al cargar el calendario académico");
      } finally {
        setCargando(false);
      }
    }

    async function cargarProfesores() {
      try {
        const data = await profesoresApi.obtenerTodos("Activo");
        setProfesores(data);
      } catch {
        // silently fail
      }
    }

    cargarCalendario();
    cargarProfesores();
  }, [filtroProfesorId]);

  const horasConClases = useMemo(() => {
    if (clases.length === 0) return [];
    const horasSet = new Set<number>();
    clases.forEach(c => {
      const hora = parseInt(c.horaInicio.split(':')[0]);
      horasSet.add(hora);
    });
    return Array.from(horasSet).sort((a, b) => a - b);
  }, [clases]);

  const horasAMostrar = mostrarHorasLibres ? HORAS : horasConClases;

  const getClaseEnCelda = (dia: string, hora: number) => {
    return clases.find(c => {
      const horaClase = parseInt(c.horaInicio.split(':')[0]);
      return c.diaSemana === dia && horaClase === hora;
    });
  };

  const getProfesorColor = (codigo: string, index: number) => {
    return colorProfesores[parseInt(codigo) % colorProfesores.length] || colorProfesores[0];
  };

  const getNombreProfesor = (codigo: string) => {
    const id = parseInt(codigo);
    const prof = profesores.find(p => p.idProfesor === id);
    return prof?.nombreCompleto || `Prof. ${codigo}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-amfar-black flex items-center gap-2">
            <div className="bg-amfar-gold/10 p-2 rounded-xl">
              <CalendarIcon className="text-amfar-gold" size={24} />
            </div>
            Calendario Académico
          </h1>
          <p className="text-gray-500 mt-1">Visualización semanal de clases y horarios.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
            <Filter size={16} className="text-gray-400" />
            <select
              className="bg-transparent outline-none text-sm font-semibold min-w-[160px]"
              value={filtroProfesorId}
              onChange={(e) => { setFiltroProfesorId(e.target.value); setCargando(true); }}
            >
              <option value="">Todos los profesores</option>
              {profesores.map(p => (
                <option key={p.idProfesor} value={String(p.idProfesor)}>{p.nombreCompleto}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setMostrarHorasLibres(!mostrarHorasLibres)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all shadow-sm ${
              mostrarHorasLibres
                ? "bg-amfar-gold/10 border-amfar-gold/30 text-amfar-gold"
                : "bg-white border-gray-100 text-gray-600 hover:border-gray-200"
            }`}
          >
            {mostrarHorasLibres ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {mostrarHorasLibres ? "Ocultar horas libres" : "Mostrar todas las horas"}
          </button>
        </div>
      </div>

      {cargando ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-100 rounded w-1/4"></div>
            <div className="grid grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 bg-gray-50 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto overflow-y-auto max-h-[70vh] relative">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-amfar-black to-gray-800 sticky top-0 z-20">
                    <th className="p-4 w-20 border-r border-white/10"></th>
                    {DIAS.map(dia => (
                      <th key={dia} className="p-4 text-sm font-bold text-white text-center min-w-[140px]">
                        {dia}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {horasAMostrar.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-12 text-center text-gray-400">
                        <div className="flex flex-col items-center gap-3">
                          <School size={40} className="text-gray-200" />
                          <p className="font-medium">No hay clases programadas</p>
                          <p className="text-sm text-gray-300">Los horarios aparecerán aquí cuando se registren inscripciones.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                  {horasAMostrar.map((hora, idx) => (
                    <tr key={hora} className={`border-b border-gray-50 transition-colors hover:bg-gray-50/50 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                      <td className="p-3 border-r border-gray-100 text-center sticky left-0 bg-inherit z-10">
                        <span className="text-[11px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">
                          {hora}:00
                        </span>
                      </td>
                      {DIAS.map(dia => {
                        const clase = getClaseEnCelda(dia, hora);
                        return (
                          <td key={`${dia}-${hora}`} className="p-1.5 min-h-[72px] align-top">
                            {clase ? (
                              <div className={`h-full rounded-lg border-l-4 p-2.5 text-xs transition-all shadow-sm hover:shadow-md ${getProfesorColor(clase.codigoProfesor, idx)} group relative`}>
                                <div className="font-bold text-gray-800 flex items-center gap-1 mb-1.5">
                                  <Music size={11} className="text-gray-500" />
                                  <span className="truncate">{clase.codigoInstrumento || "Canto"}</span>
                                </div>
                                <div className="text-[11px] text-gray-600 flex items-center gap-1 mb-1">
                                  <User size={10} className="text-gray-400" />
                                  <span className="truncate">{getNombreProfesor(clase.codigoProfesor)}</span>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] font-semibold text-gray-500 mt-1.5 pt-1.5 border-t border-gray-200/50">
                                  <Clock size={10} />
                                  {clase.horaInicio.slice(0, 5)} - {clase.horaFin.slice(0, 5)}
                                </div>

                                <div className="absolute inset-0 bg-amfar-black/90 text-white p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 flex flex-col justify-center gap-1 pointer-events-none backdrop-blur-sm">
                                  <p className="font-bold text-amfar-gold text-xs">Inscripción: {clase.codigoInscripcion}</p>
                                  <p className="text-[10px] text-gray-300">{clase.instrumentoPrestado ? "Instrumento Prestado" : "Instrumento Propio"}</p>
                                  <p className="text-[10px] text-gray-300">{getNombreProfesor(clase.codigoProfesor)}</p>
                                </div>
                              </div>
                            ) : (
                              <div className="h-full min-h-[72px] border border-dashed border-transparent rounded-lg flex items-center justify-center transition-all">
                                <span className="opacity-0 group-hover:opacity-100 text-gray-200 text-[10px] font-bold uppercase tracking-widest select-none">Libre</span>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 justify-center py-3 px-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Legenda</span>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-blue-500"></div>
              <span className="text-xs text-gray-600">Clase</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-dashed border-gray-300 rounded-sm"></div>
              <span className="text-xs text-gray-600">Disponible</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 ml-2">
              {horasConClases.length} / {HORAS.length} horarios ocupados
            </div>
          </div>
        </>
      )}
    </div>
  );
}
