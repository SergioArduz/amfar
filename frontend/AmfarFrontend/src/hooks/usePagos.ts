import { useEffect, useState } from "react";
import { obtenerPagos } from "../api/pagosApi";

export default function usePagos() {
    const [pagos, setPagos] = useState([]);

    useEffect(() => {
        obtenerPagos().then(setPagos);
    }, []);

    return { pagos };
}