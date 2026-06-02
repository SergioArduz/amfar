import { useEffect, useState } from "react";
import { Calendar as CalendarIcon, Filter, Music, Clock, User } from "lucide-react";
import api from "../services/api";
import toast from "react-hot-toast";

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
const HORAS = Array.from({ length: 13 }, (_, i) => i + 8); // 8:00 to 20:00

export default function Calendario() {
  const [clases, setClases] = useState<CalendarioClase[]>([]);
  const [cargando, setCargando] = useState(true);
  const [filtroProfesor, setFiltroProfesor] = useState("");

  useEffect(() => {
    async function cargarCalendario() {
      try {
        const response = await api.get("/calendario");
        setClases(response.data);
      } catch (error) {
        toast.error("Error al cargar el calendario académico");
      } finally {
        setCargando(false);
      }
    }
    cargarCalendario();
  }, []);

  const getClaseEnCelda = (dia: string, hora: number) => {
    return clases.find(c => {
      const horaClase = parseInt(c.horaInicio.split(':')[0]);
      return c.diaSemana === dia && horaClase === hora;
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-amfar-black flex items-center gap-2">
            <CalendarIcon className="text-amfar-gold" /> Calendario Académico
          </h1>
          <p className="text-gray-500 font-medium">Visualización de clases y disponibilidad de recursos.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
          <Filter size={18} className="text-gray-400 ml-2" />
          <select 
            className="bg-transparent outline-none text-sm font-semibold pr-4"
            value={filtroProfesor}
            onChange={(e) => setFiltroProfesor(e.target.value)}
          >
            <option value="">Todos los profesores</option>
            {/* Profesores would be dynamic here */}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 border-r border-gray-100 w-24"></th>
                {DIAS.map(dia => (
                  <th key={dia} className="p-4 text-sm font-bold text-amfar-black text-center min-w-[150px]">
                    {dia}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HORAS.map(hora => (
                <tr key={hora} className="border-b border-gray-50 last:border-0">
                  <td className="p-4 border-r border-gray-100 text-center">
                    <span className="text-xs font-bold text-gray-400">{hora}:00</span>
                  </td>
                  {DIAS.map(dia => {
                    const clase = getClaseEnCelda(dia, hora);
                    return (
                      <td key={`${dia}-${hora}`} className="p-2 h-24 group relative">
                        {clase ? (
                          <div className="h-full w-full bg-amfar-gold/10 border-l-4 border-amfar-gold rounded-lg p-3 text-xs flex flex-col justify-between hover:bg-amfar-gold/20 transition-all cursor-pointer shadow-sm">
                            <div>
                              <div className="font-bold text-amfar-goldDark flex items-center gap-1 mb-1">
                                <Music size={12} /> {clase.codigoInstrumento || "Canto"}
                              </div>
                              <div className="text-amfar-black font-medium flex items-center gap-1">
                                <User size={12} className="text-gray-400" /> Prof. {clase.codigoProfesor}
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-gray-500 font-bold mt-2">
                              <Clock size={10} /> {clase.horaInicio.slice(0, 5)} - {clase.horaFin.slice(0, 5)}
                            </div>
                            
                            {/* Hover info */}
                            <div className="absolute inset-0 bg-amfar-black/90 text-white p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 flex flex-col justify-center gap-1 pointer-events-none">
                              <p className="font-bold text-amfar-gold">Inscripción: {clase.codigoInscripcion}</p>
                              <p className="text-[10px]">{clase.instrumentoPrestado ? "Instrumento Prestado" : "Instrumento Propio"}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="h-full w-full border-2 border-dashed border-transparent group-hover:border-gray-100 rounded-lg flex items-center justify-center transition-all">
                            <span className="opacity-0 group-hover:opacity-100 text-gray-200 text-xs font-bold uppercase tracking-widest">Libre</span>
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
      
      <div className="flex items-center gap-6 justify-center py-4 bg-gray-50 rounded-2xl border border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-amfar-gold rounded-full"></div>
          <span className="text-xs font-bold text-gray-600">Clase Programada</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-dashed border-gray-300 rounded-full"></div>
          <span className="text-xs font-bold text-gray-600">Horario Disponible</span>
        </div>
      </div>
    </div>
  );
}
