import { useEffect, useState } from "react";
import type { PagoDTO } from "../../api/pagosApi";

interface Props {
  pagoSeleccionado: PagoDTO | null;
  onGuardar: (codigo: string, estadoPago: string, metodoPago: string) => void;
  onCancelar: () => void;
}

function PagoEstadoForm({ pagoSeleccionado, onGuardar, onCancelar }: Props) {
  const [estadoPago, setEstadoPago] = useState("Pendiente");
  const [metodoPago, setMetodoPago] = useState("");

  useEffect(() => {
    if (pagoSeleccionado) {
      setEstadoPago(pagoSeleccionado.estadoPago);
      setMetodoPago(pagoSeleccionado.metodoPago || "");
    }
  }, [pagoSeleccionado]);

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();

    if (!pagoSeleccionado) return;

    onGuardar(pagoSeleccionado.codigo, estadoPago, metodoPago);
  };

  if (!pagoSeleccionado) {
    return (
      <div>
        <h3>Actualizar estado de pago</h3>
        <p>Selecciona un pago para modificar su estado.</p>
      </div>
    );
  }

  return (
    <form onSubmit={enviar}>
      <h3>Actualizar estado de pago</h3>

      <p>
        <strong>Pago:</strong> {pagoSeleccionado.codigo}
      </p>

      <select
        value={estadoPago}
        onChange={(e) => setEstadoPago(e.target.value)}
      >
        <option value="Pendiente">Pendiente</option>
        <option value="Pagado">Pagado</option>
        <option value="Vencido">Vencido</option>
        <option value="Anulado">Anulado</option>
      </select>

      <input
        placeholder="Método de pago"
        value={metodoPago}
        onChange={(e) => setMetodoPago(e.target.value)}
      />

      <button type="submit">Guardar estado</button>
      <button type="button" onClick={onCancelar}>
        Cancelar
      </button>
    </form>
  );
}

export default PagoEstadoForm;