using AmfarAPI.DTOs;
using AmfarAPI.Models;
using AmfarAPI.Repositories;

namespace AmfarAPI.Services;

public class InstrumentoService : IInstrumentoService
{
    private readonly IInstrumentoRepository _repo;

    public InstrumentoService(IInstrumentoRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<InstrumentoResponse>> GetAllAsync(string? estado, string? tipo)
    {
        var instrumentos = await _repo.GetAllAsync(estado, tipo);
        return instrumentos.Select(MapToResponse).ToList();
    }

    public async Task<InstrumentoResponse?> GetByIdAsync(int id)
    {
        var instrumento = await _repo.GetByIdAsync(id);
        return instrumento is null ? null : MapToResponse(instrumento);
    }

    public async Task<InstrumentoResponse> CreateAsync(CrearInstrumentoRequest request)
    {
        if (request.StockTotal < 0)
            throw new ArgumentException("El stock no puede ser negativo");

        var instrumento = new Instrumento
        {
            Nombre = request.Nombre.Trim(),
            Tipo = request.Tipo.Trim(),
            StockTotal = request.StockTotal,
            StockDisponible = request.StockTotal,
            Estado = "Disponible"
        };

        var creado = await _repo.CreateAsync(instrumento);
        return MapToResponse(creado);
    }

    public async Task<InstrumentoResponse?> UpdateAsync(int id, ActualizarInstrumentoRequest request)
    {
        var instrumento = await _repo.GetByIdAsync(id);
        if (instrumento is null) return null;

        if (!string.IsNullOrWhiteSpace(request.Nombre))
            instrumento.Nombre = request.Nombre.Trim();

        if (!string.IsNullOrWhiteSpace(request.Tipo))
            instrumento.Tipo = request.Tipo.Trim();

        if (request.StockTotal.HasValue)
        {
            var diferencia = request.StockTotal.Value - instrumento.StockTotal;
            instrumento.StockTotal = request.StockTotal.Value;
            instrumento.StockDisponible = Math.Max(0, instrumento.StockDisponible + diferencia);
        }

        await _repo.UpdateAsync(instrumento);
        return MapToResponse(instrumento);
    }

    public async Task<InstrumentoResponse?> CambiarEstadoAsync(int id, CambiarEstadoInstrumentoRequest request)
    {
        var instrumento = await _repo.GetByIdAsync(id);
        if (instrumento is null) return null;

        var estadosValidos = new[] { "Disponible", "No Disponible", "Mantenimiento" };
        if (!estadosValidos.Contains(request.Estado))
            throw new ArgumentException($"Estado invalido. Valores permitidos: {string.Join(", ", estadosValidos)}");

        instrumento.Estado = request.Estado;
        await _repo.UpdateAsync(instrumento);
        return MapToResponse(instrumento);
    }

    public async Task<List<DisponibilidadResponse>> CheckDisponibilidadAsync(DateTime? fecha)
    {
        var instrumentos = await _repo.GetAllAsync(estado: "Disponible");
        return instrumentos.Select(i => new DisponibilidadResponse
        {
            IdInstrumento = i.IdInstrumento,
            Nombre = i.Nombre,
            Disponible = i.StockDisponible > 0,
            StockDisponible = i.StockDisponible
        }).ToList();
    }

    private static InstrumentoResponse MapToResponse(Instrumento i) => new()
    {
        IdInstrumento = i.IdInstrumento,
        Nombre = i.Nombre,
        Tipo = i.Tipo,
        StockTotal = i.StockTotal,
        StockDisponible = i.StockDisponible,
        Estado = i.Estado,
        CreatedAt = i.CreatedAt
    };
}
