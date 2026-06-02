import apiClient from "./apiClient";
import type { 
  InstrumentoResponse, 
  CrearInstrumentoRequest, 
  ActualizarInstrumentoRequest, 
  CambiarEstadoInstrumentoRequest,
  DisponibilidadResponse
} from "../types/instrumento";

export const instrumentosApi = {
  obtenerTodos: async (estado?: string, tipo?: string) => {
    const response = await apiClient.get<InstrumentoResponse[]>("/instrumentos", {
      params: { estado, tipo }
    });
    return response.data;
  },

  obtenerPorId: async (id: number) => {
    const response = await apiClient.get<InstrumentoResponse>(`/instrumentos/${id}`);
    return response.data;
  },

  crear: async (instrumento: CrearInstrumentoRequest) => {
    const response = await apiClient.post<InstrumentoResponse>("/instrumentos", instrumento);
    return response.data;
  },

  actualizar: async (id: number, instrumento: ActualizarInstrumentoRequest) => {
    const response = await apiClient.put<InstrumentoResponse>(`/instrumentos/${id}`, instrumento);
    return response.data;
  },

  cambiarEstado: async (id: number, request: CambiarEstadoInstrumentoRequest) => {
    const response = await apiClient.patch<InstrumentoResponse>(`/instrumentos/${id}/estado`, request);
    return response.data;
  },

  chequearDisponibilidad: async (fecha?: string) => {
    const response = await apiClient.get<DisponibilidadResponse[]>("/instrumentos/disponibilidad", {
      params: { fecha }
    });
    return response.data;
  }
};
