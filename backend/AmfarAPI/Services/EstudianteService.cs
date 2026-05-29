using AmfarAPI.Data.Repositories;
using AmfarAPI.DTOs.Estudiante;
using AmfarAPI.Interfaces;
using AmfarAPI.Models;

namespace AmfarAPI.Services;

public class EstudianteService : IEstudianteService
{
    private readonly EstudianteRepository _repository;

    public EstudianteService(
        EstudianteRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<EstudianteDto>> GetAllAsync()
    {
        var estudiantes =
            await _repository.GetAllAsync();

        return estudiantes.Select(e => new EstudianteDto
        {
            IdPersona = e.IdPersona,
            TieneInstrumento = e.TieneInstrumento,

            Nombre = e.Persona.Nombre,
            Apellido = e.Persona.Apellido,
            Telefono = e.Persona.Telefono,

            Tutores = e.EstudiantesTutores
                .Select(et => new TutorSimpleDto
                {
                    IdTutor = et.Tutor.IdPersona,

                    Nombre = et.Tutor.Persona.Nombre,

                    Apellido = et.Tutor.Persona.Apellido,

                    Parentesco = et.Tutor.Parentesco
                })
                .ToList()
        });
    }

    public async Task<EstudianteDto?> GetByIdAsync(int id)
    {
        var e = await _repository.GetByIdAsync(id);

        if (e == null)
            return null;

        return new EstudianteDto
        {
            IdPersona = e.IdPersona,
            TieneInstrumento = e.TieneInstrumento,

            Nombre = e.Persona.Nombre,
            Apellido = e.Persona.Apellido,
            Telefono = e.Persona.Telefono,

            Tutores = e.EstudiantesTutores
                .Select(et => new TutorSimpleDto
                {
                    IdTutor = et.Tutor.IdPersona,

                    Nombre = et.Tutor.Persona.Nombre,

                    Apellido = et.Tutor.Persona.Apellido,

                    Parentesco = et.Tutor.Parentesco
                })
                .ToList()
        };
    }

    public async Task CreateAsync(CreateEstudianteDto dto)
    {
        // ========================================
        // CREAR PERSONA
        // ========================================

        var persona = new Persona
        {
            Nombre = dto.Nombre,
            Apellido = dto.Apellido,
            Telefono = dto.Telefono
        };


        // ========================================
        // CREAR ESTUDIANTE
        // ========================================

        var estudiante = new Estudiante
        {
            Persona = persona,
            TieneInstrumento = dto.TieneInstrumento
        };


        // ========================================
        // ASIGNAR TUTORES
        // ========================================

        if (dto.IdsTutores != null &&
            dto.IdsTutores.Any())
        {
            foreach (var idTutor in dto.IdsTutores)
            {
                estudiante.EstudiantesTutores.Add(
                    new EstudianteTutor
                    {
                        Estudiante = estudiante,
                        IdTutor = idTutor
                    }
                );
            }
        }


        // ========================================
        // GUARDAR
        // ========================================

        await _repository.AddAsync(estudiante);
    }
    public async Task UpdateAsync(
        int id,
        UpdateEstudianteDto dto)
    {
        var estudiante =
            await _repository.GetByIdAsync(id);

        if (estudiante == null)
            throw new Exception("Estudiante no encontrado");


        // ========================================
        // ACTUALIZAR PERSONA
        // ========================================

        estudiante.Persona.Nombre = dto.Nombre;

        estudiante.Persona.Apellido = dto.Apellido;

        estudiante.Persona.Telefono = dto.Telefono;


        // ========================================
        // ACTUALIZAR ESTUDIANTE
        // ========================================

        estudiante.TieneInstrumento =
            dto.TieneInstrumento;


        await _repository.UpdateAsync(estudiante);
    }
    public async Task AsignarTutorAsync(
        int idEstudiante,
        AsignarTutorDto dto)
    {
        await _repository.AsignarTutorAsync(
            idEstudiante,
            dto.IdTutor
        );
    }
}