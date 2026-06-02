import api from "./api";

export interface CrearTutorRequest {
  nombre: string;
  apellido: string;
  telefono: string;
  parentesco: string;
}

export const obtenerTutores = async () => {
  const response =
    await api.get("/Tutor");

  return response.data;
};

export const obtenerTutorPorId = async (
  id: number
) => {
  const response =
    await api.get(`/Tutor/${id}`);

  return response.data;
};

export const crearTutor = async (
  tutor: CrearTutorRequest
) => {
  const response =
    await api.post("/Tutor", tutor);

  return response.data;
};

export const actualizarTutor = async (
  id: number,
  tutor: CrearTutorRequest
) => {
  const response =
    await api.put(
      `/Tutor/${id}`,
      tutor
    );

  return response.data;
};

export const eliminarTutor = async (
  id: number
) => {
  const response =
    await api.delete(
      `/Tutor/${id}`
    );

  return response.data;
};