import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { Mail, Lock, Music, LogIn } from "lucide-react";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await login({ email, contrasena });

      localStorage.setItem("token", response.token);
      localStorage.setItem("usuario", JSON.stringify(response));

      toast.success(`Bienvenido, ${response.nombre}`);
      navigate("/estudiantes");
    } catch {
      toast.error("Credenciales incorrectas o cuenta inactiva");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amfar-black via-gray-900 to-amfar-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Abstract music notes pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-[15%] left-[10%] text-[120px] text-white">♪</div>
        <div className="absolute top-[25%] right-[15%] text-[80px] text-white">♫</div>
        <div className="absolute bottom-[20%] left-[20%] text-[100px] text-white">♩</div>
        <div className="absolute bottom-[30%] right-[10%] text-[90px] text-white">♬</div>
        <div className="absolute top-[50%] left-[5%] text-[60px] text-white">♪</div>
        <div className="absolute top-[10%] right-[30%] text-[70px] text-white">♫</div>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-amfar-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-[420px] relative">
        {/* Logo / Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amfar-gold to-yellow-600 rounded-2xl shadow-2xl shadow-amfar-gold/30 mb-5">
            <Music size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">AMFAR</h1>
          <p className="text-gray-400 mt-1 text-sm font-medium">Academia de Música</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-white">Acceso al Sistema</h2>
            <p className="text-gray-400 text-sm mt-1">Ingresa tus credenciales para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-300 ml-1">Correo Electrónico</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-amfar-gold/20 to-yellow-500/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity blur-md"></div>
                <div className="relative flex items-center">
                  <Mail size={18} className="absolute left-3.5 text-gray-400 group-focus-within:text-amfar-gold transition-colors" />
                  <input
                    type="email"
                    placeholder="tu@correo.com"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-amfar-gold/50 focus:border-amfar-gold outline-none transition-all text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-300 ml-1">Contraseña</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-amfar-gold/20 to-yellow-500/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity blur-md"></div>
                <div className="relative flex items-center">
                  <Lock size={18} className="absolute left-3.5 text-gray-400 group-focus-within:text-amfar-gold transition-colors" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-amfar-gold/50 focus:border-amfar-gold outline-none transition-all text-sm"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amfar-gold to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-amfar-black font-bold py-3.5 rounded-xl shadow-lg shadow-amfar-gold/25 transition-all active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none mt-2 flex items-center justify-center gap-2 text-sm"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-amfar-black/30 border-t-amfar-black rounded-full animate-spin"></div>
                  <span>Ingresando...</span>
                </div>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Ingresar</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Floating musical staff lines decoration at bottom */}
        <div className="mt-8 flex justify-center gap-1 opacity-20">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-8 h-[1px] bg-white"></div>
          ))}
        </div>

        <p className="text-center text-[11px] text-gray-600 mt-6">
          AMFAR Academia de Música &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}

export default Login;
