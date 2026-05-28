using AmfarAPI.Models;

namespace AmfarAPI.Repositories;

public interface IPrestamoRepository
{
    Task<PrestamoInstrumento> CreateAsync(PrestamoInstrumento prestamo);
    Task<PrestamoInstrumento?> GetByIdAsync(int id);
    Task<List<PrestamoInstrumento>> GetByInscripcionAsync(int idInscripcion);
    Task UpdateAsync(PrestamoInstrumento prestamo);
    Task<int> ContarActivosPorInstrumentoAsync(int idInstrumento);
}
