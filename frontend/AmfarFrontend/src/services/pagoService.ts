import { pagosApi } from "../api/pagosApi";

export const obtenerPagos = async () => {
  return await pagosApi.obtenerTodos();
};
