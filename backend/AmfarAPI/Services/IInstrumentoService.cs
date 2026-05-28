using AmfarAPI.DTOs;
using AmfarAPI.Models;

namespace AmfarAPI.Services;

public interface IInstrumentoService
{
    Task<List<InstrumentoResponse>> GetAllAsync(string? estado, string? tipo);
    Task<InstrumentoResponse?> GetByIdAsync(int id);
    Task<InstrumentoResponse> CreateAsync(CrearInstrumentoRequest request);
    Task<InstrumentoResponse?> UpdateAsync(int id, ActualizarInstrumentoRequest request);
    Task<InstrumentoResponse?> CambiarEstadoAsync(int id, CambiarEstadoInstrumentoRequest request);
    Task<List<DisponibilidadResponse>> CheckDisponibilidadAsync(DateTime? fecha);
}
