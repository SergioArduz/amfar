import apiClient from "./apiClient";

export interface ClaseInscripcionDTO {
  codigoProfesor: string;
  codigoInstrumento?: string | null;
  instrumentoPrestado: boolean;
  diaSemana: string;
  horaInicio: string;
  horaFin: string;
}

export interface InscripcionDTO {
  codigo: string;
  fechaInicio: string;
  fechaFin?: string | null;
  modalidad: string;
  codigoEstudiante: string;
  codigoPlan: string;
  codigoDescuento?: string | null;
  clases: ClaseInscripcionDTO[];
}

export const inscripcionesApi = {
  obtenerTodas: async (): Promise<InscripcionDTO[]> => {
    const response = await apiClient.get("/Inscripcions");
    return response.data;
  },

  obtenerActivas: async (): Promise<InscripcionDTO[]> => {
    const response = await apiClient.get("/Inscripcions/activas");
    return response.data;
  },

  obtenerPorCodigo: async (codigo: string): Promise<InscripcionDTO> => {
    const response = await apiClient.get(`/Inscripcions/${codigo}`);
    return response.data;
  },

  crear: async (inscripcion: InscripcionDTO): Promise<InscripcionDTO> => {
    const response = await apiClient.post("/Inscripcions", inscripcion);
    return response.data;
  },

  desactivar: async (codigo: string): Promise<string> => {
    const response = await apiClient.delete(`/Inscripcions/${codigo}`);
    return response.data;
  },
};