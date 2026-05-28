using AmfarAPI.Data;
using AmfarAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AmfarAPI.Repositories;

public class ProfesorRepository : IProfesorRepository
{
    private readonly AppDbContext _context;

    public ProfesorRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Profesor>> GetAllAsync(string? estado = null, int? idInstrumento = null)
    {
        var query = _context.Profesores
            .Include(p => p.Persona)
            .Include(p => p.Especialidades)
                .ThenInclude(e => e.Instrumento)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(estado))
            query = query.Where(p => p.Estado == estado);

        if (idInstrumento.HasValue)
            query = query.Where(p => p.Especialidades.Any(e => e.IdInstrumento == idInstrumento.Value));

        return await query.OrderBy(p => p.Persona.Nombre).ToListAsync();
    }

    public async Task<Profesor?> GetByIdAsync(int id)
    {
        return await _context.Profesores
            .Include(p => p.Persona)
            .Include(p => p.Especialidades)
                .ThenInclude(e => e.Instrumento)
            .FirstOrDefaultAsync(p => p.IdProfesor == id);
    }

    public async Task<Profesor> CreateAsync(Profesor profesor)
    {
        profesor.FechaRegistro = DateTime.UtcNow;
        _context.Profesores.Add(profesor);
        await _context.SaveChangesAsync();
        return profesor;
    }

    public async Task UpdateAsync(Profesor profesor)
    {
        _context.Profesores.Update(profesor);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> ExistsByPersonaIdAsync(int idPersona)
    {
        return await _context.Profesores.AnyAsync(p => p.IdPersona == idPersona);
    }
}
