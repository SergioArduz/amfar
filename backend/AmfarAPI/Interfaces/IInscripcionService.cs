using AmfarAPI.DTOs;

namespace AmfarAPI.Interfaces;

public interface IInscripcionService
{
    Task<List<InscripcionDTO>> ObtenerTodas();
    Task<List<InscripcionDTO>> ObtenerActivas();
    Task<InscripcionDTO?> ObtenerPorCodigo(string codigo);
    Task<InscripcionDTO?> Crear(InscripcionDTO dto);
    Task<bool> Desactivar(string codigo);
}
