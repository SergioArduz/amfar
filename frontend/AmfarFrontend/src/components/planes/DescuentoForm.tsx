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
    if (descuentoEditar) setForm(descuentoEditar);
  }, [descuentoEditar]);

  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "porcentaje" ? Number(value) : value,
    }));
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    onGuardar(form);
  };

  return (
    <form onSubmit={enviar} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Código</label>
          <input
            name="codigo"
            placeholder="Ej: DESC-001"
            value={form.codigo}
            onChange={manejarCambio}
            disabled={!!descuentoEditar}
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre del Descuento</label>
          <input
            name="nombreDescuento"
            placeholder="Ej: Descuento por hermanos"
            value={form.nombreDescuento}
            onChange={manejarCambio}
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Porcentaje (%)</label>
          <input
            name="porcentaje"
            type="number"
            placeholder="Ej: 10"
            value={form.porcentaje}
            onChange={manejarCambio}
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
          <textarea
            name="descripcion"
            placeholder="Breve descripción del descuento"
            value={form.descripcion}
            onChange={manejarCambio}
            rows={2}
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amfar-gold outline-none transition-all text-sm resize-none"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancelar} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all">
          Cancelar
        </button>
        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-amfar-gold hover:bg-yellow-600 rounded-xl transition-all shadow-lg shadow-amfar-gold/20">
          {descuentoEditar ? "Actualizar Descuento" : "Guardar Descuento"}
        </button>
      </div>
    </form>
  );
}

export default DescuentoForm;
