import apiClient from "./apiClient";

export interface DescuentoDTO {
  codigo: string;
  nombreDescuento: string;
  porcentaje: number;
  descripcion: string;
}

export const descuentosApi = {
  obtenerTodos: async (): Promise<DescuentoDTO[]> => {
    const response = await apiClient.get("/Descuentoes");
    return response.data;
  },

  obtenerActivos: async (): Promise<DescuentoDTO[]> => {
    const response = await apiClient.get("/Descuentoes/activos");
    return response.data;
  },

  obtenerPorCodigo: async (codigo: string): Promise<DescuentoDTO> => {
    const response = await apiClient.get(`/Descuentoes/${codigo}`);
    return response.data;
  },

  crear: async (descuento: DescuentoDTO): Promise<DescuentoDTO> => {
    const response = await apiClient.post("/Descuentoes", descuento);
    return response.data;
  },

  actualizar: async (
    codigo: string,
    descuento: DescuentoDTO
  ): Promise<DescuentoDTO> => {
    const response = await apiClient.put(`/Descuentoes/${codigo}`, descuento);
    return response.data;
  },

  desactivar: async (codigo: string): Promise<string> => {
    const response = await apiClient.delete(`/Descuentoes/${codigo}`);
    return response.data;
  },
};