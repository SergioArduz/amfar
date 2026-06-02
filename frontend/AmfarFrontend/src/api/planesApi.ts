import apiClient from "./apiClient";

export interface PlanDTO {
  codigo: string;
  nombrePlan: string;
  monto: number;
  horasSemanales: number;
  horasMensuales: number;
  esIndividual: boolean;
}

export const planesApi = {
  obtenerTodos: async (): Promise<PlanDTO[]> => {
    const response = await apiClient.get("/planes");
    return response.data;
  },

  obtenerActivos: async (): Promise<PlanDTO[]> => {
    const response = await apiClient.get("/planes/activos");
    return response.data;
  },

  obtenerPorCodigo: async (codigo: string): Promise<PlanDTO> => {
    const response = await apiClient.get(`/planes/${codigo}`);
    return response.data;
  },

  crear: async (plan: PlanDTO): Promise<PlanDTO> => {
    const response = await apiClient.post("/planes", plan);
    return response.data;
  },

  actualizar: async (codigo: string, plan: PlanDTO): Promise<PlanDTO> => {
    const response = await apiClient.put(`/planes/${codigo}`, plan);
    return response.data;
  },

  desactivar: async (codigo: string): Promise<string> => {
    const response = await apiClient.delete(`/planes/${codigo}`);
    return response.data;
  },
};