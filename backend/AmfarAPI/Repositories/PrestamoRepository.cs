using AmfarAPI.Data;
using AmfarAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AmfarAPI.Repositories;

public class PrestamoRepository : IPrestamoRepository
{
    private readonly AppDbContext _context;

    public PrestamoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<PrestamoInstrumento> CreateAsync(PrestamoInstrumento prestamo)
    {
        _context.PrestamosInstrumentos.Add(prestamo);
        await _context.SaveChangesAsync();
        return prestamo;
    }

    public async Task<PrestamoInstrumento?> GetByIdAsync(int id)
    {
        return await _context.PrestamosInstrumentos
            .Include(p => p.Instrumento)
            .FirstOrDefaultAsync(p => p.IdPrestamo == id);
    }

    public async Task<List<PrestamoInstrumento>> GetByInscripcionAsync(int idInscripcion)
    {
        return await _context.PrestamosInstrumentos
            .Include(p => p.Instrumento)
            .Where(p => p.IdInscripcion == idInscripcion)
            .OrderByDescending(p => p.FechaInicio)
            .ToListAsync();
    }

    public async Task UpdateAsync(PrestamoInstrumento prestamo)
    {
        _context.PrestamosInstrumentos.Update(prestamo);
        await _context.SaveChangesAsync();
    }

    public async Task<int> ContarActivosPorInstrumentoAsync(int idInstrumento)
    {
        return await _context.PrestamosInstrumentos
            .CountAsync(p => p.IdInstrumento == idInstrumento && p.Estado == "Activo" && !p.EsPropio);
    }
}
