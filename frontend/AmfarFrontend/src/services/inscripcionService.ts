import { inscripcionesApi } from "../api/inscripcionesApi";

export const obtenerInscripciones = async () => {
  return await inscripcionesApi.obtenerTodas();
};
