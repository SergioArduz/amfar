using AmfarAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AmfarAPI.Data.Repositories;

public class EstudianteRepository
{
    private readonly AppDbContext _context;

    public EstudianteRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Estudiante>> GetAllAsync()
    {
        return await _context.Estudiantes
            .Include(e => e.Persona)
            .Include(e => e.EstudiantesTutores)
                .ThenInclude(et => et.Tutor)
                    .ThenInclude(t => t.Persona)
            .ToListAsync();
    }

    public async Task<Estudiante?> GetByIdAsync(int id)
    {
        return await _context.Estudiantes
            .Include(e => e.Persona)
            .Include(e => e.EstudiantesTutores)
                .ThenInclude(et => et.Tutor)
                    .ThenInclude(t => t.Persona)
            .FirstOrDefaultAsync(e => e.IdPersona == id);
    }

    public async Task AddAsync(Estudiante estudiante)
    {
        await _context.Estudiantes.AddAsync(estudiante);

        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Estudiante estudiante)
    {
        _context.Estudiantes.Update(estudiante);

        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var estudiante =
            await _context.Estudiantes.FindAsync(id);

        if (estudiante != null)
        {
            _context.Estudiantes.Remove(estudiante);

            await _context.SaveChangesAsync();
        }
    }

    // ========================================
    // ASIGNAR TUTOR
    // ========================================

    public async Task AsignarTutorAsync(
        int idEstudiante,
        int idTutor)
    {
        var existe =
            await _context.EstudiantesTutores
                .AnyAsync(et =>
                    et.IdEstudiante == idEstudiante
                    &&
                    et.IdTutor == idTutor);

        if (existe)
            return;

        var relacion = new EstudianteTutor
        {
            IdEstudiante = idEstudiante,
            IdTutor = idTutor
        };

        await _context.EstudiantesTutores
            .AddAsync(relacion);

        await _context.SaveChangesAsync();
    }
    public async Task ActualizarTutoresAsync(
        int idEstudiante,
        List<int>? idsTutores)
    {
        var relaciones =
            await _context.EstudiantesTutores
                .Where(et => et.IdEstudiante == idEstudiante)
                .ToListAsync();

        _context.EstudiantesTutores.RemoveRange(relaciones);

        if (idsTutores != null)
        {
            foreach (var idTutor in idsTutores)
            {
                await _context.EstudiantesTutores.AddAsync(
                    new EstudianteTutor
                    {
                        IdEstudiante = idEstudiante,
                        IdTutor = idTutor
                    });
            }
        }

        await _context.SaveChangesAsync();
    }
}