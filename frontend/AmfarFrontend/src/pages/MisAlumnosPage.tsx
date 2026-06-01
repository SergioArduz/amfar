import MainLayout from "../layouts/MainLayout";

import useAlumnos from "../hooks/useAlumnos";

export default function MisAlumnosPage() {
    const { alumnos } =
        useAlumnos();

    return (
        <MainLayout>
            <h1 className="text-3xl font-bold mb-6">
                Mis Alumnos
            </h1>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[#D9A441]">
                            <th className="p-4">
                                Alumno
                            </th>

                            <th>
                                Instrumento
                            </th>

                            <th>Fecha</th>

                            <th>Horario</th>
                        </tr>
                    </thead>

                    <tbody>
                        {alumnos.map(
                            (a: any, index) => (
                                <tr
                                    key={index}
                                    className="border-b"
                                >
                                    <td className="p-4">
                                        {a.alumno}
                                    </td>

                                    <td>
                                        {a.instrumento}
                                    </td>

                                    <td>
                                        {new Date(
                                            a.fecha
                                        ).toLocaleDateString()}
                                    </td>

                                    <td>
                                        {a.horaInicio}
                                        {" - "}
                                        {a.horaFin}
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </MainLayout>
    );
}