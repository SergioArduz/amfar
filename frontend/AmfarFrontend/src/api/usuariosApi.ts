import apiClient from "./apiClient";

export interface UsuarioDTO {
  idUsuario: number;
  idPersona: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  rol: number;
  estado: string;
}

export interface CreateUsuarioRequest {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  contrasena: string;
  rol: number;
}

export interface UpdateUsuarioRequest {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  rol: number;
}

export const ROL_MAP: Record<number, string> = {
  1: "Administrador",
  2: "Directora",
  3: "Secretaria",
  4: "Profesor",
};

export const usuariosApi = {
  obtenerTodos: async (): Promise<UsuarioDTO[]> => {
    const response = await apiClient.get("/usuario");
    return response.data;
  },

  obtenerPorId: async (id: number): Promise<UsuarioDTO> => {
    const response = await apiClient.get(`/usuario/${id}`);
    return response.data;
  },

  crear: async (usuario: CreateUsuarioRequest): Promise<void> => {
    await apiClient.post("/usuario", usuario);
  },

  actualizar: async (id: number, usuario: UpdateUsuarioRequest): Promise<void> => {
    await apiClient.put(`/usuario/${id}`, usuario);
  },

  toggleEstado: async (id: number): Promise<void> => {
    await apiClient.patch(`/usuario/${id}/estado`);
  },

  eliminar: async (id: number): Promise<void> => {
    await apiClient.delete(`/usuario/${id}`);
  },
};
