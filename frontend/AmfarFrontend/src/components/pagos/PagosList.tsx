import type { PagoDTO } from "../../api/pagosApi";

interface Props {
  pagos: PagoDTO[];
  onCambiarEstado: (pago: PagoDTO) => void;
  onEliminar: (codigo: string) => void;
}

function PagosList({ pagos, onCambiarEstado, onEliminar }: Props) {
  return (
    <div>
      <h3>Listado de Pagos</h3>

      {pagos.length === 0 ? (
        <p>No hay pagos registrados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Inscripción</th>
              <th>Vencimiento</th>
              <th>Fecha pago</th>
              <th>Monto</th>
              <th>Método</th>
              <th>Estado pago</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {pagos.map((pago) => (
              <tr key={pago.codigo}>
                <td>{pago.codigo}</td>
                <td>{pago.codigoInscripcion}</td>
                <td>{pago.fechaVencimiento}</td>
                <td>{pago.fechaPago || "Sin pagar"}</td>
                <td>Bs. {pago.monto}</td>
                <td>{pago.metodoPago || "No definido"}</td>
                <td>{pago.estadoPago}</td>
                <td>
                  <button onClick={() => onCambiarEstado(pago)}>
                    Cambiar estado
                  </button>
                  <button onClick={() => onEliminar(pago.codigo)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PagosList;