import { useEffect, useState } from "react";

import { pagosApi } from "../api/pagosApi";
import type { PagoDTO } from "../api/pagosApi";

import PagosList from "../components/pagos/PagosList";
import PagoEstadoForm from "../components/pagos/PagoEstadoForm";
import PagoForm from "../components/pagos/PagoForm";

function PagosPage() {
  const [pagos, setPagos] = useState<PagoDTO[]>([]);
  const [pagoSeleccionado, setPagoSeleccionado] = useState<PagoDTO | null>(null);

  const cargarPagos = async () => {
    const data = await pagosApi.obtenerTodos();
    setPagos(data);
  };

  useEffect(() => {
    cargarPagos();
  }, []);

  const guardarPago = async (pago: PagoDTO) => {
  try {
    await pagosApi.crear(pago);
    await cargarPagos();
    alert("Pago guardado correctamente.");
  } catch (error: any) {
    console.error("ERROR AL GUARDAR PAGO:", error);
    console.error("RESPUESTA BACKEND:", error.response?.data);
    alert(JSON.stringify(error.response?.data, null, 2));
  }
};

  const actualizarEstado = async (
    codigo: string,
    estadoPago: string,
    metodoPago: string
  ) => {
    await pagosApi.actualizarEstado(codigo, estadoPago, metodoPago);
    setPagoSeleccionado(null);
    cargarPagos();
  };

  const eliminarPago = async (codigo: string) => {
    await pagosApi.desactivar(codigo);
    cargarPagos();
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Gestión de Pagos</h2>

      <section className="card">
        <PagoForm onGuardar={guardarPago} />
      </section>

      <section className="card">
        <PagoEstadoForm
          pagoSeleccionado={pagoSeleccionado}
          onGuardar={actualizarEstado}
          onCancelar={() => setPagoSeleccionado(null)}
        />
      </section>

      <section className="card">
        <PagosList
          pagos={pagos}
          onCambiarEstado={setPagoSeleccionado}
          onEliminar={eliminarPago}
        />
      </section>
    </div>
  );
}

export default PagosPage;