using AmfarAPI.DTOs.Tutor;

namespace AmfarAPI.Interfaces;

public interface ITutorService
{
    Task<IEnumerable<TutorDto>> GetAllAsync();

    Task<TutorDto?> GetByIdAsync(int id);

    Task CreateAsync(CreateTutorDto dto);

    Task UpdateAsync(int id, UpdateTutorDto dto);

    Task DeleteAsync(int id);
}