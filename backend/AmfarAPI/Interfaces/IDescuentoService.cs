using AmfarAPI.DTOs;

namespace AmfarAPI.Interfaces;

public interface IDescuentoService
{
    Task<List<DescuentoDTO>> ObtenerTodos();
    Task<List<DescuentoDTO>> ObtenerActivos();
    Task<DescuentoDTO?> ObtenerPorCodigo(string codigo);
    Task<DescuentoDTO> Crear(DescuentoDTO dto);
    Task<DescuentoDTO?> Actualizar(string codigo, DescuentoDTO dto);
    Task<bool> Desactivar(string codigo);
}
