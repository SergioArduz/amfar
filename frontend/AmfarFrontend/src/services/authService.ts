import axios from "axios";

const API_URL = "http://localhost:5178/api/Auth";
// cambia el puerto por el de tu backend

export interface LoginRequest {
    email: string;
    contrasena: string;
}

export interface LoginResponse {
    token: string;
    expiracion: string;
    nombre: string;
    apellido: string;
    email: string;
    rol: string;
}

export const login = async (
    data: LoginRequest
): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(
        `${API_URL}/login`,
        data
    );

    return response.data;
};