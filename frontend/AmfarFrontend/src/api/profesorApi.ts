import api from "./axios";

export const obtenerAlumnosProfesor =
    async (id: number) => {
        const response =
            await api.get(
                `/profesores/${id}/alumnos`
            );

        return response.data;
    };