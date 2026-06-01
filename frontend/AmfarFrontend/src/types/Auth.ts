export interface LoginRequest {
    email: string;
    contrasena: string;
}

export interface AuthResponse {
    token: string;
    expiracion: string;
    nombre: string;
    apellido: string;
    email: string;
    rol: string;
}