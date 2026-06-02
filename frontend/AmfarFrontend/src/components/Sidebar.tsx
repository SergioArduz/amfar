import React from "react";
import { 
  Users, 
  UserRound, 
  Calendar, 
  CreditCard, 
  FileText, 
  Music, 
  LayoutDashboard,
  LogOut,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Package
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Calendar, label: "Calendario", path: "/calendario" },
  { icon: FileText, label: "Inscripciones", path: "/inscripciones" },
  { icon: CreditCard, label: "Pagos", path: "/pagos" },
  { icon: Users, label: "Estudiantes", path: "/estudiantes" },
  { icon: UserRound, label: "Tutores", path: "/tutores" },
  { icon: GraduationCap, label: "Profesores", path: "/profesores" },
  { icon: Package, label: "Instrumentos", path: "/instrumentos" },
  { icon: Music, label: "Planes", path: "/planes" },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
    <aside 
      className={cn(
        "h-screen bg-amfar-black text-white transition-all duration-300 flex flex-col sticky top-0",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex flex-col">
            <span className="font-bold text-xl text-amfar-gold">AMFAR</span>
            <span className="text-xs text-gray-400">Academia de Música</span>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-amfar-gold text-white shadow-lg shadow-amfar-gold/20" 
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              )}
            >
              <item.icon size={22} className={cn("min-w-[22px]", isActive ? "text-white" : "group-hover:text-amfar-gold")} />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button 
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-4 px-4 py-3 w-full rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all duration-200",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut size={22} />
          {!isCollapsed && <span className="font-medium">Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  );
}
