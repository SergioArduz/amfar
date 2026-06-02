import { useEffect, useState } from "react";

import { pagosApi } from "../api/pagosApi";
import type { PagoDTO } from "../api/pagosApi";

import PagosList from "../components/pagos/PagosList";
import PagoEstadoForm from "../components/pagos/PagoEstadoForm";

function PagosPage() {
  const [pagos, setPagos] = useState<PagoDTO[]>([]);
  const [pagoSeleccionado, setPagoSeleccionado] = useState<PagoDTO | null>(null);

  const cargarPagos = async () => {
    try {
      const data = await pagosApi.obtenerActivos();
      setPagos(data);
    } catch (error) {
      console.error("ERROR CARGANDO PAGOS:", error);
    }
  };

  useEffect(() => {
    cargarPagos();
  }, []);

  const actualizarEstado = async (
    codigo: string,
    estadoPago: string,
    metodoPago: string
  ) => {
    try {
      await pagosApi.actualizarEstado(codigo, estadoPago, metodoPago);
      setPagoSeleccionado(null);
      await cargarPagos();
      alert("Estado de pago actualizado correctamente.");
    } catch (error: any) {
      console.error("ERROR ACTUALIZANDO PAGO:", error);
      console.error("RESPUESTA BACKEND:", error.response?.data);
      alert("No se pudo actualizar el estado del pago.");
    }
  };

  const eliminarPago = async (codigo: string) => {
    try {
      await pagosApi.desactivar(codigo);
      await cargarPagos();
    } catch (error) {
      console.error("ERROR ELIMINANDO PAGO:", error);
      alert("No se pudo eliminar el pago.");
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Gestión de Pagos</h2>

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