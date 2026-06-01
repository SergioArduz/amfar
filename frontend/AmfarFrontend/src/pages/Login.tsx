import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import "../styles/Login.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            const response = await login({
                email,
                contrasena,
            });

            localStorage.setItem(
                "token",
                response.token
            );

            localStorage.setItem(
                "usuario",
                JSON.stringify(response)
            );

            navigate("/estudiantes");

        } catch {
            setError(
                "Correo o contraseña incorrectos"
            );
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">

                <h1>AMFAR</h1>

                <h2>Iniciar Sesión</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="Correo"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={contrasena}
                        onChange={(e) =>
                            setContrasena(e.target.value)
                        }
                    />

                    {error && (
                        <p className="error">
                            {error}
                        </p>
                    )}

                    <button type="submit">
                        Ingresar
                    </button>

                </form>

            </div>
        </div>
    );
}

export default Login;