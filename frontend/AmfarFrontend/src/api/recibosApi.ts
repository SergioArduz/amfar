import api from "./axios";

export const obtenerRecibos = async () => {
    const response =
        await api.get("/Recibo");

    return response.data;
};