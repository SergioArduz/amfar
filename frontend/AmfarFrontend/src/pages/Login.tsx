import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { Music, Mail, Lock, AlertCircle } from "lucide-react";
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

            toast.success(`¡Bienvenido, ${response.nombre}!`);
            navigate("/estudiantes");

        } catch (error: any) {
            toast.error("Credenciales incorrectas o cuenta inactiva");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-amfar-black flex items-center justify-center p-4">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-amfar-gold/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amfar-gold/10 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full max-w-md relative">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="bg-amfar-gold p-8 text-center text-white relative">
                        <div className="absolute top-4 right-4 opacity-20">
                            <Music size={120} />
                        </div>
                        <div className="relative z-10">
                            <h1 className="text-4xl font-bold tracking-tighter mb-1">AMFAR</h1>
                            <p className="text-amfar-goldDark font-medium">Academia de Música</p>
                        </div>
                    </div>

                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-amfar-black mb-6 text-center">Acceso al Sistema</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Correo Electrónico</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="email"
                                        placeholder="ejemplo@amfar.com"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold focus:border-transparent outline-none transition-all"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Contraseña</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold focus:border-transparent outline-none transition-all"
                                        value={contrasena}
                                        onChange={(e) => setContrasena(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-amfar-black hover:bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg shadow-black/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Cargando...</span>
                                    </div>
                                ) : "Ingresar"}
                            </button>
                        </form>
                    </div>
                    
                    <div className="px-8 pb-8 text-center">
                        <p className="text-xs text-gray-400">
                            Protegido por AMFAR Security &copy; 2026
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
