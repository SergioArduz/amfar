import api from "./api";

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
    const response = await api.post<LoginResponse>(
        "/Auth/login",
        data
    );

    return response.data;
};