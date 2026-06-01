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
    const response = await apiClient.get("/Plans");
    return response.data;
  },

  obtenerActivos: async (): Promise<PlanDTO[]> => {
    const response = await apiClient.get("/Plans/activos");
    return response.data;
  },

  obtenerPorCodigo: async (codigo: string): Promise<PlanDTO> => {
    const response = await apiClient.get(`/Plans/${codigo}`);
    return response.data;
  },

  crear: async (plan: PlanDTO): Promise<PlanDTO> => {
    const response = await apiClient.post("/Plans", plan);
    return response.data;
  },

  actualizar: async (codigo: string, plan: PlanDTO): Promise<PlanDTO> => {
    const response = await apiClient.put(`/Plans/${codigo}`, plan);
    return response.data;
  },

  desactivar: async (codigo: string): Promise<string> => {
    const response = await apiClient.delete(`/Plans/${codigo}`);
    return response.data;
  },
};