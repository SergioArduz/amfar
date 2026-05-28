using AmfarAPI.Data;
using AmfarAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AmfarAPI.Repositories;

public class InstrumentoRepository : IInstrumentoRepository
{
    private readonly AppDbContext _context;

    public InstrumentoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Instrumento>> GetAllAsync(string? estado = null, string? tipo = null)
    {
        var query = _context.Instrumentos.AsQueryable();

        if (!string.IsNullOrWhiteSpace(estado))
            query = query.Where(i => i.Estado == estado);

        if (!string.IsNullOrWhiteSpace(tipo))
            query = query.Where(i => i.Tipo == tipo);

        return await query.OrderBy(i => i.Nombre).ToListAsync();
    }

    public async Task<Instrumento?> GetByIdAsync(int id)
    {
        return await _context.Instrumentos.FindAsync(id);
    }

    public async Task<Instrumento> CreateAsync(Instrumento instrumento)
    {
        instrumento.StockDisponible = instrumento.StockTotal;
        instrumento.CreatedAt = DateTime.UtcNow;

        _context.Instrumentos.Add(instrumento);
        await _context.SaveChangesAsync();
        return instrumento;
    }

    public async Task UpdateAsync(Instrumento instrumento)
    {
        instrumento.UpdatedAt = DateTime.UtcNow;
        _context.Instrumentos.Update(instrumento);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var instrumento = await _context.Instrumentos.FindAsync(id);
        if (instrumento is null) return false;

        _context.Instrumentos.Remove(instrumento);
        await _context.SaveChangesAsync();
        return true;
    }
}
