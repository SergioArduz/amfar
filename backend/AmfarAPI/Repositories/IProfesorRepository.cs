using AmfarAPI.Models;

namespace AmfarAPI.Repositories;

public interface IProfesorRepository
{
    Task<List<Profesor>> GetAllAsync(string? estado = null, int? idInstrumento = null);
    Task<Profesor?> GetByIdAsync(int id);
    Task<Profesor> CreateAsync(Profesor profesor);
    Task UpdateAsync(Profesor profesor);
    Task<bool> ExistsByPersonaIdAsync(int idPersona);
}
