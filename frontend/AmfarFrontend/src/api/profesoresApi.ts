import apiClient from "./apiClient";
import type { 
  ProfesorResponse, 
  CrearProfesorRequest, 
  ActualizarProfesorRequest, 
  AgregarEspecialidadRequest 
} from "../types/profesor";

export const profesoresApi = {
  obtenerTodos: async (estado?: string, idInstrumento?: number) => {
    const response = await apiClient.get<ProfesorResponse[]>("/profesores", {
      params: { estado, idInstrumento }
    });
    return response.data;
  },

  obtenerPorId: async (id: number) => {
    const response = await apiClient.get<ProfesorResponse>(`/profesores/${id}`);
    return response.data;
  },

  crear: async (profesor: CrearProfesorRequest) => {
    const response = await apiClient.post<ProfesorResponse>("/profesores", profesor);
    return response.data;
  },

  actualizar: async (id: number, profesor: ActualizarProfesorRequest) => {
    const response = await apiClient.put<ProfesorResponse>(`/profesores/${id}`, profesor);
    return response.data;
  },

  toggleEstado: async (id: number) => {
    const response = await apiClient.patch<ProfesorResponse>(`/profesores/${id}/estado`);
    return response.data;
  },

  agregarEspecialidad: async (id: number, request: AgregarEspecialidadRequest) => {
    const response = await apiClient.post<ProfesorResponse>(`/profesores/${id}/especialidades`, request);
    return response.data;
  },

  eliminarEspecialidad: async (id: number, idInstrumento: number) => {
    await apiClient.delete(`/profesores/${id}/especialidades/${idInstrumento}`);
  }
};
