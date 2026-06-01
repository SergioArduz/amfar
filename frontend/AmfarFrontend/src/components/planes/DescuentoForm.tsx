import { useEffect, useState } from "react";
import type { DescuentoDTO } from "../../api/descuentosApi";

interface Props {
  descuentoEditar: DescuentoDTO | null;
  onGuardar: (descuento: DescuentoDTO) => void;
  onCancelar: () => void;
}

function DescuentoForm({ descuentoEditar, onGuardar, onCancelar }: Props) {
  const [form, setForm] = useState<DescuentoDTO>({
    codigo: "",
    nombreDescuento: "",
    porcentaje: 0,
    descripcion: "",
  });

  useEffect(() => {
    if (descuentoEditar) {
      setForm(descuentoEditar);
    }
  }, [descuentoEditar]);

  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "porcentaje" ? Number(value) : value,
    });
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    onGuardar(form);
  };

  return (
    <form onSubmit={enviar}>
      <h3>{descuentoEditar ? "Editar Descuento" : "Registrar Descuento"}</h3>

      <input
        name="codigo"
        placeholder="Código"
        value={form.codigo}
        onChange={manejarCambio}
        disabled={!!descuentoEditar}
        required
      />

      <input
        name="nombreDescuento"
        placeholder="Nombre del descuento"
        value={form.nombreDescuento}
        onChange={manejarCambio}
        required
      />

      <input
        name="porcentaje"
        type="number"
        placeholder="Porcentaje"
        value={form.porcentaje}
        onChange={manejarCambio}
        required
      />

      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={form.descripcion}
        onChange={manejarCambio}
      />

      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancelar}>
        Cancelar
      </button>
    </form>
  );
}

export default DescuentoForm;