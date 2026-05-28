using AmfarAPI.DTOs;
using AmfarAPI.Models;

namespace AmfarAPI.Services;

public interface IPrestamoService
{
    Task<PrestamoResponse> CreateAsync(CrearPrestamoRequest request);
    Task<PrestamoResponse?> DevolverAsync(int id, DevolucionRequest request);
    Task<List<PrestamoResponse>> GetByInscripcionAsync(int idInscripcion);
    Task<bool> VerificarDisponibilidadAsync(int idInstrumento);
}
