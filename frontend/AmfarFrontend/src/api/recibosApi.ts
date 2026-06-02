import apiClient from "./apiClient";

export interface ReciboDTO {
  idRecibo: number;
  numeroRecibo: string;
  codigoPago: string;
  fechaEmision: string;
  monto: number;
  datosAlumno: string;
  nombrePlan: string;
  periodo: string;
  emitidoPor: string;
}

export const recibosApi = {
  generar: async (codigoPago: string): Promise<ReciboDTO> => {
    const response = await apiClient.post(`/recibos/generar/${codigoPago}`);
    return response.data;
  },
  obtenerPorPago: async (codigoPago: string): Promise<ReciboDTO[]> => {
    const response = await apiClient.get(`/recibos/pago/${codigoPago}`);
    return response.data;
  },
};
