import api from "./api";

export interface CrearEstudianteRequest {
    nombre: string;
    apellido: string;
    telefono: string;
    tieneInstrumento: boolean;
    idsTutores: number[];
}

export const obtenerEstudiantes = async () => {
    const response =
        await api.get("/Estudiante");

    return response.data;
};

export const obtenerEstudiantePorId = async (
    id: number
) => {
    const response =
        await api.get(`/Estudiante/${id}`);

    return response.data;
};

export const crearEstudiante = async (
    estudiante: CrearEstudianteRequest
) => {
    const response =
        await api.post(
            "/Estudiante",
            estudiante
        );

    return response.data;
};

export const actualizarEstudiante = async (
    id: number,
    estudiante: CrearEstudianteRequest
) => {
    const response =
        await api.put(
            `/Estudiante/${id}`,
            estudiante
        );

    return response.data;
};

export const eliminarEstudiante = async (
    id: number
) => {
    const response =
        await api.delete(`/Estudiante/${id}`);

    return response.data;
};