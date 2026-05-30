using AmfarAPI.Models;

namespace AmfarAPI.Interfaces
{
    public interface IDescuentoRepository
    {
        Task<List<Descuento>> ObtenerTodos();
        Task<List<Descuento>> ObtenerActivos();
        Task<Descuento> ObtenerPorCodigo(string codigo);
        Task<Descuento> Crear(Descuento descuento);
        Task<Descuento> Actualizar(Descuento descuento);
        Task<bool> Desactivar(string codigo);
    }
}
