import { useState } from "react";
import type {
  InscripcionDTO,
  ClaseInscripcionDTO,
} from "../../api/inscripcionesApi";
import type { PlanDTO } from "../../api/planesApi";
import type { DescuentoDTO } from "../../api/descuentosApi";

interface Props {
  planes: PlanDTO[];
  descuentos: DescuentoDTO[];
  onGuardar: (inscripcion: InscripcionDTO) => void;
}

function InscripcionForm({ planes, descuentos, onGuardar }: Props) {
  const [form, setForm] = useState<InscripcionDTO>({
    codigo: "",
    fechaInicio: "",
    fechaFin: null,
    modalidad: "",
    codigoEstudiante: "",
    codigoPlan: "",
    codigoDescuento: null,
    clases: [],
  });

  const [clase, setClase] = useState<ClaseInscripcionDTO>({
    codigoProfesor: "",
    codigoInstrumento: "",
    instrumentoPrestado: false,
    diaSemana: "",
    horaInicio: "",
    horaFin: "",
  });

  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "codigoDescuento"
          ? value === ""
            ? null
            : value
          : value,
    }));
  };

  const manejarClase = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setClase((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.codigoPlan) {
      alert("Selecciona un plan.");
      return;
    }

    if (
      !clase.codigoProfesor ||
      !clase.diaSemana ||
      !clase.horaInicio ||
      !clase.horaFin
    ) {
      alert("Completa profesor, día, hora inicio y hora fin.");
      return;
    }

    const claseEnviar: ClaseInscripcionDTO = {
      ...clase,
      codigoInstrumento: clase.codigoInstrumento || null,
      horaInicio:
        clase.horaInicio.length === 5
          ? `${clase.horaInicio}:00`
          : clase.horaInicio,
      horaFin:
        clase.horaFin.length === 5
          ? `${clase.horaFin}:00`
          : clase.horaFin,
    };

    const inscripcionEnviar: InscripcionDTO = {
      codigo: form.codigo,
      fechaInicio: form.fechaInicio ? `${form.fechaInicio}T00:00:00Z` : "",
      fechaFin: form.fechaFin ? `${form.fechaFin}T00:00:00Z` : null,
      modalidad: form.modalidad,
      codigoEstudiante: form.codigoEstudiante,
      codigoPlan: form.codigoPlan,
      codigoDescuento: form.codigoDescuento || null,
      clases: [claseEnviar],
    };

    console.log("INSCRIPCIÓN ENVIADA:", inscripcionEnviar);

    onGuardar(inscripcionEnviar);
  };

  return (
    <form onSubmit={enviar}>
      <h3>Registrar Inscripción</h3>

      <div className="form-grid">
        <input
          name="codigo"
          placeholder="Código inscripción"
          value={form.codigo}
          onChange={manejarCambio}
          required
        />

        <input
          name="codigoEstudiante"
          placeholder="Código estudiante"
          value={form.codigoEstudiante}
          onChange={manejarCambio}
          required
        />

        <input
          name="fechaInicio"
          type="date"
          value={form.fechaInicio}
          onChange={manejarCambio}
          required
        />

        <input
          name="fechaFin"
          type="date"
          value={form.fechaFin ?? ""}
          onChange={manejarCambio}
        />

        <select
          name="modalidad"
          value={form.modalidad}
          onChange={manejarCambio}
          required
        >
          <option value="">Seleccione modalidad</option>
          <option value="Individual">Individual</option>
          <option value="Grupal">Grupal</option>
        </select>

        <select
        name="codigoPlan"
        value={form.codigoPlan}
        onChange={manejarCambio}
        required
      >
        {planes
  .filter((plan) => plan.codigo && plan.codigo.trim() !== "")
  .map((plan) => (
    <option key={plan.codigo} value={plan.codigo}>
      {plan.nombrePlan} - Bs. {plan.monto}
    </option>
  ))}
      </select>

        <select
          name="codigoDescuento"
          value={form.codigoDescuento ?? ""}
          onChange={manejarCambio}
        >
          <option value="">Sin descuento</option>
          {descuentos.map((descuento) => (
            <option key={descuento.codigo} value={descuento.codigo}>
              {descuento.nombreDescuento} - {descuento.porcentaje}%
            </option>
          ))}
        </select>
      </div>

      <br />

      <h4>Clase / horario</h4>

      <div className="form-grid">
        <input
          name="codigoProfesor"
          placeholder="Código profesor"
          value={clase.codigoProfesor}
          onChange={manejarClase}
          required
        />

        <input
          name="codigoInstrumento"
          placeholder="Código instrumento"
          value={clase.codigoInstrumento ?? ""}
          onChange={manejarClase}
        />

        <label>
          <input
            name="instrumentoPrestado"
            type="checkbox"
            checked={clase.instrumentoPrestado}
            onChange={manejarClase}
          />
          Instrumento prestado
        </label>

        <select
          name="diaSemana"
          value={clase.diaSemana}
          onChange={manejarClase}
          required
        >
          <option value="">Día</option>
          <option value="Lunes">Lunes</option>
          <option value="Martes">Martes</option>
          <option value="Miércoles">Miércoles</option>
          <option value="Jueves">Jueves</option>
          <option value="Viernes">Viernes</option>
          <option value="Sábado">Sábado</option>
        </select>

        <input
          name="horaInicio"
          type="time"
          value={clase.horaInicio}
          onChange={manejarClase}
          required
        />

        <input
          name="horaFin"
          type="time"
          value={clase.horaFin}
          onChange={manejarClase}
          required
        />
      </div>

      <br />

      <button className="btn-primary" type="submit">
        Guardar inscripción
      </button>
    </form>
  );
}

export default InscripcionForm;