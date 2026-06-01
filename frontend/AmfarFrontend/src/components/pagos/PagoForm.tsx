import { useState } from "react";
import type { PagoDTO } from "../../api/pagosApi";

interface Props {
  onGuardar: (pago: PagoDTO) => void;
}

function PagoForm({ onGuardar }: Props) {
  const [form, setForm] = useState<PagoDTO>({
    codigo: "",
    codigoInscripcion: "",
    fechaVencimiento: "",
    fechaPago: null,
    monto: 0,
    metodoPago: "",
    estadoPago: "Pendiente",
  });

  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "monto" ? Number(value) : value,
    }));
  };

  const convertirFechaUTC = (fecha: string) => {
    if (!fecha) return "";
    return fecha.length === 10 ? `${fecha}T00:00:00Z` : `${fecha}:00Z`;
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();

    const pagoEnviar: PagoDTO = {
      codigo: form.codigo,
      codigoInscripcion: form.codigoInscripcion,
      fechaVencimiento: convertirFechaUTC(form.fechaVencimiento),
      fechaPago:
        form.estadoPago === "Pagado" && form.fechaPago
          ? convertirFechaUTC(form.fechaPago)
          : null,
      monto: form.monto,
      metodoPago: form.metodoPago,
      estadoPago: form.estadoPago,
    };

    console.log("PAGO ENVIADO:", pagoEnviar);

    onGuardar(pagoEnviar);
  };

  return (
    <form onSubmit={enviar}>
      <h3>Registrar Pago</h3>

      <div className="form-grid">
        <input
          name="codigo"
          placeholder="Código pago"
          value={form.codigo}
          onChange={manejarCambio}
          required
        />

        <input
          name="codigoInscripcion"
          placeholder="Código inscripción"
          value={form.codigoInscripcion}
          onChange={manejarCambio}
          required
        />

        <input
          name="fechaVencimiento"
          type="datetime-local"
          value={form.fechaVencimiento}
          onChange={manejarCambio}
          required
        />

        <input
          name="monto"
          type="number"
          placeholder="Monto"
          value={form.monto}
          onChange={manejarCambio}
          required
        />

        <select
          name="estadoPago"
          value={form.estadoPago}
          onChange={manejarCambio}
        >
          <option value="Pendiente">Pendiente</option>
          <option value="Pagado">Pagado</option>
          <option value="Vencido">Vencido</option>
          <option value="Anulado">Anulado</option>
        </select>

        <input
          name="metodoPago"
          placeholder="Método de pago"
          value={form.metodoPago}
          onChange={manejarCambio}
        />

        {form.estadoPago === "Pagado" && (
          <input
            name="fechaPago"
            type="datetime-local"
            value={form.fechaPago ?? ""}
            onChange={manejarCambio}
            required
          />
        )}
      </div>

      <br />

      <button className="btn-primary" type="submit">
        Guardar pago
      </button>
    </form>
  );
}

export default PagoForm;