using AmfarAPI.DTOs.Persona;

namespace AmfarAPI.Interfaces;

public interface IPersonaService
{
    Task<IEnumerable<PersonaDto>> GetAllAsync();

    Task<PersonaDto?> GetByIdAsync(int id);

    Task CreateAsync(CreatePersonaDto dto);

    Task UpdateAsync(int id, UpdatePersonaDto dto);

    Task DeleteAsync(int id);
}