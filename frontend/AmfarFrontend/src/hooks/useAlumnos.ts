import { useEffect, useState } from "react";

import {
    obtenerAlumnosProfesor,
} from "../api/profesorApi";

export default function useAlumnos() {
    const [alumnos, setAlumnos] =
        useState([]);

    useEffect(() => {
        cargar();
    }, []);

    const cargar = async () => {
        const profesorId =
            localStorage.getItem(
                "profesorId"
            );

        if (!profesorId) return;

        const data =
            await obtenerAlumnosProfesor(
                Number(profesorId)
            );

        setAlumnos(data);
    };

    return {
        alumnos,
    };
}