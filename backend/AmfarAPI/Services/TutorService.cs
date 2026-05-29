using AmfarAPI.Data.Repositories;
using AmfarAPI.DTOs.Tutor;
using AmfarAPI.Interfaces;
using AmfarAPI.Models;

namespace AmfarAPI.Services;

public class TutorService : ITutorService
{
    private readonly TutorRepository _repository;

    public TutorService(TutorRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<TutorDto>> GetAllAsync()
    {
        var tutores = await _repository.GetAllAsync();

        return tutores.Select(t => new TutorDto
        {
            IdPersona = t.IdPersona,

            Nombre = t.Persona.Nombre,

            Apellido = t.Persona.Apellido,

            Telefono = t.Persona.Telefono,

            Parentesco = t.Parentesco
        });
    }

    public async Task<TutorDto?> GetByIdAsync(int id)
    {
        var tutor = await _repository.GetByIdAsync(id);

        if (tutor == null)
            return null;

        return new TutorDto
        {
            IdPersona = tutor.IdPersona,

            Nombre = tutor.Persona.Nombre,

            Apellido = tutor.Persona.Apellido,

            Telefono = tutor.Persona.Telefono,

            Parentesco = tutor.Parentesco
        };
    }

    public async Task CreateAsync(CreateTutorDto dto)
    {
        var tutor = new Tutor
        {
            Persona = new Persona
            {
                Nombre = dto.Nombre,
                Apellido = dto.Apellido,
                Telefono = dto.Telefono
            },

            Parentesco = dto.Parentesco
        };

        await _repository.AddAsync(tutor);
    }

    public async Task UpdateAsync(int id, UpdateTutorDto dto)
    {
        var tutor = await _repository.GetByIdAsync(id);

        if (tutor == null)
            throw new Exception("Tutor no encontrado");

        tutor.Persona.Nombre = dto.Nombre;

        tutor.Persona.Apellido = dto.Apellido;

        tutor.Persona.Telefono = dto.Telefono;

        tutor.Parentesco = dto.Parentesco;

        await _repository.UpdateAsync(tutor);
    }

    public async Task DeleteAsync(int id)
    {
        await _repository.DeleteAsync(id);
    }
}