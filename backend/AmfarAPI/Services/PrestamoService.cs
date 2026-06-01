using AmfarAPI.Data;
using AmfarAPI.DTOs;
using AmfarAPI.Models;
using AmfarAPI.Repositories;
using Microsoft.EntityFrameworkCore;

namespace AmfarAPI.Services;

public class PrestamoService : IPrestamoService
{
    private readonly AppDbContext _context;
    private readonly IPrestamoRepository _repo;
    private readonly IInstrumentoRepository _instrumentoRepo;

    public PrestamoService(AppDbContext context, IPrestamoRepository repo, IInstrumentoRepository instrumentoRepo)
    {
        _context = context;
        _repo = repo;
        _instrumentoRepo = instrumentoRepo;
    }

    public async Task<PrestamoResponse> CreateAsync(CrearPrestamoRequest request)
    {
        var instrumento = await _instrumentoRepo.GetByIdAsync(request.IdInstrumento)
            ?? throw new ArgumentException("El instrumento no existe");

        if (!request.EsPropio)
        {
            var prestamosActivos = await _repo.ContarActivosPorInstrumentoAsync(request.IdInstrumento);
            if (prestamosActivos >= instrumento.StockDisponible)
                throw new InvalidOperationException(
                    $"No hay stock disponible para '{instrumento.Nombre}'. " +
                    $"Disponibles: {instrumento.StockDisponible - prestamosActivos}");
        }

        using var transaction = await _context.Database.BeginTransactionAsync(System.Data.IsolationLevel.Serializable);

        try
        {
            if (!request.EsPropio)
            {
                instrumento.StockDisponible--;
                await _instrumentoRepo.UpdateAsync(instrumento);
            }

            var prestamo = new PrestamoInstrumento
            {
                IdInscripcion = request.IdInscripcion,
                IdInstrumento = request.IdInstrumento,
                EsPropio = request.EsPropio,
                FechaInicio = request.FechaInicio,
                Estado = "Activo"
            };

            var creado = await _repo.CreateAsync(prestamo);
            await transaction.CommitAsync();
            return MapToResponse(creado);
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    public async Task<PrestamoResponse?> DevolverAsync(int id, DevolucionRequest request)
    {
        var prestamo = await _repo.GetByIdAsync(id);
        if (prestamo is null) return null;

        if (prestamo.Estado == "Devuelto")
            throw new InvalidOperationException("Este prestamo ya fue devuelto");

        prestamo.Estado = "Devuelto";
        prestamo.FechaFin = request.FechaFin;
        await _repo.UpdateAsync(prestamo);

        if (!prestamo.EsPropio)
        {
            var instrumento = await _instrumentoRepo.GetByIdAsync(prestamo.IdInstrumento);
            if (instrumento is not null)
            {
                instrumento.StockDisponible++;
                await _instrumentoRepo.UpdateAsync(instrumento);
            }
        }

        return MapToResponse(prestamo);
    }

    public async Task<List<PrestamoResponse>> GetByInscripcionAsync(int idInscripcion)
    {
        var prestamos = await _repo.GetByInscripcionAsync(idInscripcion);
        return prestamos.Select(MapToResponse).ToList();
    }

    public async Task<bool> VerificarDisponibilidadAsync(int idInstrumento)
    {
        var instrumento = await _instrumentoRepo.GetByIdAsync(idInstrumento);
        if (instrumento is null) return false;

        var activos = await _repo.ContarActivosPorInstrumentoAsync(idInstrumento);
        return activos < instrumento.StockDisponible;
    }

    private static PrestamoResponse MapToResponse(PrestamoInstrumento p) => new()
    {
        IdPrestamo = p.IdPrestamo,
        IdInscripcion = p.IdInscripcion,
        IdInstrumento = p.IdInstrumento,
        NombreInstrumento = p.Instrumento.Nombre,
        EsPropio = p.EsPropio,
        FechaInicio = p.FechaInicio,
        FechaFin = p.FechaFin,
        Estado = p.Estado
    };
}
