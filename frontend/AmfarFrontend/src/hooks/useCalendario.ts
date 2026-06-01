import { useEffect, useState } from "react";

import { obtenerCalendario } from "../api/clasesApi";

export default function useCalendario() {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        cargar();
    }, []);

    const cargar = async () => {
        const data =
            await obtenerCalendario();

        const calendarEvents =
            data.map((clase: any) => ({
                title:
                    `${clase.alumno} - ${clase.instrumento}`,

                start: new Date(
                    `${clase.fecha.split("T")[0]}T${clase.horaInicio}`
                ),

                end: new Date(
                    `${clase.fecha.split("T")[0]}T${clase.horaFin}`
                ),

                aula: clase.aula,
                profesor: clase.profesor,
            }));

        setEventos(calendarEvents);
    };

    return {
        eventos,
    };
}