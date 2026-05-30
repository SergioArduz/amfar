using AmfarAPI.Models;

namespace AmfarAPI.Interfaces
{
    public interface IPlanRepository
    {
        Task<List<Plan>> ObtenerTodos();
        Task<List<Plan>> ObtenerActivos();
        Task<Plan> ObtenerPorCodigo(string codigo);
        Task<Plan> Crear(Plan plan);
        Task<Plan> Actualizar(Plan plan);
        Task<bool> Desactivar(string codigo);
    }
}
