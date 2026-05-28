using AmfarAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AmfarAPI.Data.Repositories;

public class PersonaRepository
{
    private readonly AppDbContext _context;

    public PersonaRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Persona>> GetAllAsync()
    {
        return await _context.Personas.ToListAsync();
    }

    public async Task<Persona?> GetByIdAsync(int id)
    {
        return await _context.Personas.FindAsync(id);
    }

    public async Task AddAsync(Persona persona)
    {
        await _context.Personas.AddAsync(persona);

        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Persona persona)
    {
        _context.Personas.Update(persona);

        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var persona = await _context.Personas.FindAsync(id);

        if (persona != null)
        {
            _context.Personas.Remove(persona);

            await _context.SaveChangesAsync();
        }
    }
}