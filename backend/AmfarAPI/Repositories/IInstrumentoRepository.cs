using AmfarAPI.Models;

namespace AmfarAPI.Repositories;

public interface IInstrumentoRepository
{
    Task<List<Instrumento>> GetAllAsync(string? estado = null, string? tipo = null);
    Task<Instrumento?> GetByIdAsync(int id);
    Task<Instrumento> CreateAsync(Instrumento instrumento);
    Task UpdateAsync(Instrumento instrumento);
    Task<bool> DeleteAsync(int id);
}
