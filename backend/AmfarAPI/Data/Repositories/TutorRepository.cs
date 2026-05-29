using AmfarAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AmfarAPI.Data.Repositories;

public class TutorRepository
{
    private readonly AppDbContext _context;

    public TutorRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Tutor>> GetAllAsync()
    {
        return await _context.Tutores
            .Include(t => t.Persona)
            .ToListAsync();
    }

    public async Task<Tutor?> GetByIdAsync(int id)
    {
        return await _context.Tutores
            .Include(t => t.Persona)
            .FirstOrDefaultAsync(t => t.IdPersona == id);
    }

    public async Task AddAsync(Tutor tutor)
    {
        await _context.Tutores.AddAsync(tutor);

        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Tutor tutor)
    {
        _context.Tutores.Update(tutor);

        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var tutor = await _context.Tutores.FindAsync(id);

        if (tutor != null)
        {
            _context.Tutores.Remove(tutor);

            await _context.SaveChangesAsync();
        }
    }
}