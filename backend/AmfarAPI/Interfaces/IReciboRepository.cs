using AmfarAPI.Models;

namespace AmfarAPI.Interfaces
{
    public interface IReciboRepository
    {
        Task<List<Recibo>> ObtenerTodos();
        Task<Recibo?> ObtenerPorNumero(string numeroRecibo);
        Task<List<Recibo>> ObtenerPorPago(string codigoPago);
        Task<Recibo> Crear(Recibo recibo);
    }
}
