import apiClient from "./apiClient";

export interface DescuentoDTO {
  codigo: string;
  nombreDescuento: string;
  porcentaje: number;
  descripcion: string;
}

export const descuentosApi = {
  obtenerTodos: async (): Promise<DescuentoDTO[]> => {
    const response = await apiClient.get("/descuentos");
    return response.data;
  },

  obtenerActivos: async (): Promise<DescuentoDTO[]> => {
    const response = await apiClient.get("/descuentos/activos");
    return response.data;
  },

  obtenerPorCodigo: async (codigo: string): Promise<DescuentoDTO> => {
    const response = await apiClient.get(`/descuentos/${codigo}`);
    return response.data;
  },

  crear: async (descuento: DescuentoDTO): Promise<DescuentoDTO> => {
    const response = await apiClient.post("/descuentos", descuento);
    return response.data;
  },

  actualizar: async (
    codigo: string,
    descuento: DescuentoDTO
  ): Promise<DescuentoDTO> => {
    const response = await apiClient.put(`/descuentos/${codigo}`, descuento);
    return response.data;
  },

  desactivar: async (codigo: string): Promise<string> => {
    const response = await apiClient.delete(`/descuentos/${codigo}`);
    return response.data;
  },
};