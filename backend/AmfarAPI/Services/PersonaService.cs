using AmfarAPI.Data.Repositories;
using AmfarAPI.DTOs.Persona;
using AmfarAPI.Interfaces;
using AmfarAPI.Models;

namespace AmfarAPI.Services;

public class PersonaService : IPersonaService
{
    private readonly PersonaRepository _repository;

    public PersonaService(PersonaRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<PersonaDto>> GetAllAsync()
    {
        var personas = await _repository.GetAllAsync();

        return personas.Select(p => new PersonaDto
        {
            IdPersona = p.IdPersona,
            Nombre = p.Nombre,
            Apellido = p.Apellido,
            Telefono = p.Telefono
        });
    }

    public async Task<PersonaDto?> GetByIdAsync(int id)
    {
        var persona = await _repository.GetByIdAsync(id);

        if (persona == null)
            return null;

        return new PersonaDto
        {
            IdPersona = persona.IdPersona,
            Nombre = persona.Nombre,
            Apellido = persona.Apellido,
            Telefono = persona.Telefono
        };
    }

    public async Task CreateAsync(CreatePersonaDto dto)
    {
        var persona = new Persona
        {
            Nombre = dto.Nombre,
            Apellido = dto.Apellido,
            Telefono = dto.Telefono
        };

        await _repository.AddAsync(persona);
    }

    public async Task UpdateAsync(int id, UpdatePersonaDto dto)
    {
        var persona = await _repository.GetByIdAsync(id);

        if (persona == null)
            throw new KeyNotFoundException("Persona no encontrada");

        if (!string.IsNullOrWhiteSpace(dto.Nombre))
            persona.Nombre = dto.Nombre;

        if (!string.IsNullOrWhiteSpace(dto.Apellido))
            persona.Apellido = dto.Apellido;

        if (!string.IsNullOrWhiteSpace(dto.Telefono))
            persona.Telefono = dto.Telefono;

        await _repository.UpdateAsync(persona);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var persona = await _repository.GetByIdAsync(id);
        if (persona == null) return false;

        await _repository.DeleteAsync(id);
        return true;
    }
}