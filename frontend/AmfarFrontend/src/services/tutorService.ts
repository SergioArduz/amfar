import api from "./api";

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
  tutor: any
) => {
  const response =
    await api.post("/Tutor", tutor);

  return response.data;
};

export const actualizarTutor = async (
  id: number,
  tutor: any
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