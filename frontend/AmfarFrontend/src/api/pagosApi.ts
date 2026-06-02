import apiClient from "./apiClient";
export interface PagoDTO {
  codigo: string;
  codigoInscripcion: string;
  fechaVencimiento: string;
  fechaPago?: string | null;
  monto: number;
  metodoPago: string;
  estadoPago: string;
}

export const pagosApi = {
  obtenerTodos: async (): Promise<PagoDTO[]> => {
    const response = await apiClient.get("/pagos");
    return response.data;
  },

  obtenerActivos: async (): Promise<PagoDTO[]> => {
    const response = await apiClient.get("/pagos/activos");
    return response.data;
  },

  obtenerPorCodigo: async (codigo: string): Promise<PagoDTO> => {
    const response = await apiClient.get(`/pagos/${codigo}`);
    return response.data;
  },

  obtenerPorInscripcion: async (
    codigoInscripcion: string
  ): Promise<PagoDTO[]> => {
    const response = await apiClient.get(`/pagos/inscripcion/${codigoInscripcion}`);
    return response.data;
  },

  crear: async (pago: PagoDTO): Promise<PagoDTO> => {
    const response = await apiClient.post("/pagos", pago);
    return response.data;
  },

  actualizarEstado: async (
    codigo: string,
    estadoPago: string,
    metodoPago: string
  ): Promise<PagoDTO> => {
    const response = await apiClient.put(
      `/pagos/${codigo}/estado`,
      { estadoPago, metodoPago }
    );
    return response.data;
  },

  desactivar: async (codigo: string): Promise<string> => {
    const response = await apiClient.delete(`/pagos/${codigo}`);
    return response.data;
  },
};