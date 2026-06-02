using AmfarAPI.DTOs;

namespace AmfarAPI.Interfaces;

public interface IPagoService
{
    Task<List<PagoDTO>> ObtenerTodos();
    Task<List<PagoDTO>> ObtenerActivos();
    Task<PagoDTO?> ObtenerPorCodigo(string codigo);
    Task<List<PagoDTO>> ObtenerPorInscripcion(string codigoInscripcion);
    Task<PagoDTO> Crear(PagoDTO dto);
    Task<PagoDTO?> ActualizarEstadoPago(string codigo, string estadoPago, string metodoPago);
    Task<bool> Desactivar(string codigo);
}
