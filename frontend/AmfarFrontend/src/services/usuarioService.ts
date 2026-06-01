import api from "./api";

export const obtenerUsuarios = async () => {
  const response =
    await api.get("/Usuario");

  return response.data;
};

export const obtenerUsuarioPorId =
  async (id: number) => {

    const response =
      await api.get(`/Usuario/${id}`);

    return response.data;
  };

export const crearUsuario =
  async (usuario: any) => {

    const response =
      await api.post(
        "/Usuario",
        usuario
      );

    return response.data;
  };

export const actualizarUsuario =
  async (
    id: number,
    usuario: any
  ) => {

    const response =
      await api.put(
        `/Usuario/${id}`,
        usuario
      );

    return response.data;
  };

export const eliminarUsuario =
  async (id: number) => {

    const response =
      await api.delete(
        `/Usuario/${id}`
      );

    return response.data;
  };