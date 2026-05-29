using AmfarAPI.DTOs.Estudiante;

namespace AmfarAPI.Interfaces;

public interface IEstudianteService
{
    Task<IEnumerable<EstudianteDto>> GetAllAsync();

    Task<EstudianteDto?> GetByIdAsync(int id);

    Task CreateAsync(CreateEstudianteDto dto);

    Task UpdateAsync(int id, UpdateEstudianteDto dto);


    Task AsignarTutorAsync(
        int idEstudiante,
        AsignarTutorDto dto
    );
}