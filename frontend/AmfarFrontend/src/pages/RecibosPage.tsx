import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { obtenerRecibos } from "../api/recibosApi";

export default function RecibosPage() {
    const [recibos, setRecibos] = useState([]);

    useEffect(() => {
        obtenerRecibos().then(setRecibos);
    }, []);

    return (
        <MainLayout>
            <h1 className="text-3xl font-bold mb-6">
                Historial de Recibos
            </h1>

            <div className="grid gap-4">
                {recibos.map((r: any, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-xl shadow p-5"
                    >
                        <h2 className="font-bold">
                            {r.numeroRecibo}
                        </h2>

                        <p>
                            Fecha:
                            {new Date(
                                r.fechaPago
                            ).toLocaleDateString()}
                        </p>

                        <p>Bs. {r.monto}</p>

                        <button
                            onClick={() =>
                                window.print()
                            }
                            className="mt-4 bg-[#D9A441] px-4 py-2 rounded"
                        >
                            Imprimir
                        </button>
                    </div>
                ))}
            </div>
        </MainLayout>
    );
}