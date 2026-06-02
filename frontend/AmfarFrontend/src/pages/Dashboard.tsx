import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, GraduationCap, CreditCard, Music, TrendingUp, Calendar as CalendarIcon } from "lucide-react";
import { obtenerEstudiantes } from "../services/estudianteService";
import { obtenerInscripciones } from "../services/inscripcionService";
import { obtenerPagos } from "../services/pagoService";
import toast from "react-hot-toast";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeEnrollments: 0,
    pendingPayments: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [students, enrollments, pagos] = await Promise.all([
          obtenerEstudiantes(),
          obtenerInscripciones(),
          obtenerPagos()
        ]);

        const pending = pagos.filter(p => p.estadoPago === "Pendiente");
        const total = pagos
          .filter(p => p.estadoPago === "Pagado")
          .reduce((acc, curr) => acc + curr.monto, 0);

        setStats({
          totalStudents: students.length,
          activeEnrollments: enrollments.filter(e => e.clases.length > 0).length,
          pendingPayments: pending.length,
          totalRevenue: total,
        });
      } catch (error) {
        toast.error("Error al cargar estadísticas del dashboard");
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const cards = [
    { 
      label: "Total Estudiantes", 
      value: stats.totalStudents, 
      icon: Users, 
      color: "bg-blue-500",
      trend: "+12% este mes"
    },
    { 
      label: "Inscripciones Activas", 
      value: stats.activeEnrollments, 
      icon: GraduationCap, 
      color: "bg-amfar-gold",
      trend: "85% de capacidad"
    },
    { 
      label: "Pagos Pendientes", 
      value: stats.pendingPayments, 
      icon: CreditCard, 
      color: "bg-red-500",
      trend: "Requiere atención"
    },
    { 
      label: "Ingresos Totales", 
      value: `Bs. ${stats.totalRevenue.toLocaleString()}`, 
      icon: TrendingUp, 
      color: "bg-green-500",
      trend: "+5.4% vs mes anterior"
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold text-amfar-black">Panel de Control</h1>
        <p className="text-gray-500 font-medium">Bienvenido al sistema de gestión AMFAR. Aquí tienes un resumen de hoy.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 ${card.color} opacity-[0.03] -mr-8 -mt-8 rounded-full group-hover:scale-110 transition-transform`}></div>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{card.label}</p>
                <h3 className="text-3xl font-bold mt-2 text-amfar-black">
                  {loading ? <div className="h-8 w-16 bg-gray-100 animate-pulse rounded"></div> : card.value}
                </h3>
              </div>
              <div className={`${card.color} p-3 rounded-xl text-white shadow-lg`}>
                <card.icon size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-medium">
              <span className={card.label.includes("Pendientes") ? "text-red-500" : "text-green-500"}>{card.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-amfar-black flex items-center gap-2">
              <CalendarIcon className="text-amfar-gold" /> Próximas Clases
            </h3>
            <button onClick={() => navigate("/calendario")} className="text-sm font-bold text-amfar-gold hover:underline">Ver calendario completo</button>
          </div>
          <div className="space-y-4">
            {/* Placeholder for list */}
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-transparent hover:border-amfar-gold/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex flex-col items-center justify-center border border-gray-200 shadow-sm">
                    <span className="text-[10px] font-bold text-amfar-gold uppercase">Lun</span>
                    <span className="text-sm font-bold text-amfar-black">15</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-amfar-black">Piano Individual</h4>
                    <p className="text-xs text-gray-500">Prof. Sergio Villarrubia • 14:30 - 15:30</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700">Confirmada</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amfar-black p-8 rounded-2xl shadow-2xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 -mr-10 -mt-10">
            <Music size={200} />
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-4">Acceso Rápido</h3>
            <div className="space-y-3">
              <button onClick={() => navigate("/inscripciones")} className="w-full py-3 px-4 bg-amfar-gold hover:bg-amfar-goldLight text-amfar-black font-bold rounded-xl transition-all flex items-center justify-between">
                Nueva Inscripción <GraduationCap size={18} />
              </button>
              <button onClick={() => navigate("/pagos")} className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all flex items-center justify-between">
                Registrar Pago <CreditCard size={18} />
              </button>
              <button onClick={() => navigate("/instrumentos")} className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all flex items-center justify-between">
                Gestionar Instrumentos <Music size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
