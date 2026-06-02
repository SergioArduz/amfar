using AmfarAPI.DTOs;

namespace AmfarAPI.Interfaces;

public interface IPlanService
{
    Task<List<PlanDTO>> ObtenerTodos();
    Task<List<PlanDTO>> ObtenerActivos();
    Task<PlanDTO?> ObtenerPorCodigo(string codigo);
    Task<PlanDTO> Crear(PlanDTO dto);
    Task<PlanDTO?> Actualizar(string codigo, PlanDTO dto);
    Task<bool> Desactivar(string codigo);
}
