using AmfarAPI.DTOs;
using AmfarAPI.Models;

namespace AmfarAPI.Services;

public interface IProfesorService
{
    Task<List<ProfesorResponse>> GetAllAsync(string? estado, int? idInstrumento);
    Task<ProfesorResponse?> GetByIdAsync(int id);
    Task<ProfesorResponse> CreateAsync(CrearProfesorRequest request);
    Task<ProfesorResponse?> UpdateAsync(int id, ActualizarProfesorRequest request);
    Task<ProfesorResponse?> CambiarEstadoAsync(int id);
    Task<ProfesorResponse?> AgregarEspecialidadAsync(int idProfesor, int idInstrumento);
    Task<bool> EliminarEspecialidadAsync(int idProfesor, int idInstrumento);
}
