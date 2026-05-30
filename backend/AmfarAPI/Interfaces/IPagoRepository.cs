using AmfarAPI.Models;

namespace AmfarAPI.Interfaces
{
    public interface IPagoRepository
    {
        Task<List<Pago>> ObtenerTodos();
        Task<List<Pago>> ObtenerActivos();
        Task<Pago?> ObtenerPorCodigo(string codigo);
        Task<List<Pago>> ObtenerPorInscripcion(string codigoInscripcion);
        Task<Pago> Crear(Pago pago);
        Task<Pago> Actualizar(Pago pago);
        Task<bool> Desactivar(string codigo);
    }
}