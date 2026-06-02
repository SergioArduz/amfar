using AmfarAPI.DTOs;

namespace AmfarAPI.Interfaces;

public interface IReciboService
{
    Task<List<ReciboDTO>> ObtenerTodos();
    Task<ReciboDTO?> ObtenerPorNumero(string numeroRecibo);
    Task<List<ReciboDTO>> ObtenerPorPago(string codigoPago);
    Task<ReciboDTO?> Generar(string codigoPago, string emitidoPor);
}
