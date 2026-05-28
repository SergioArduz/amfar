using AmfarAPI.DTOs;
using AmfarAPI.Models;
using AmfarAPI.Repositories;
using AmfarAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace AmfarAPI.Services;

public class ProfesorService : IProfesorService
{
    private readonly IProfesorRepository _repo;
    private readonly IInstrumentoRepository _instrumentoRepo;
    private readonly AppDbContext _context;

    public ProfesorService(
        IProfesorRepository repo,
        IInstrumentoRepository instrumentoRepo,
        AppDbContext context)
    {
        _repo = repo;
        _instrumentoRepo = instrumentoRepo;
        _context = context;
    }

    public async Task<List<ProfesorResponse>> GetAllAsync(string? estado, int? idInstrumento)
    {
        var profesores = await _repo.GetAllAsync(estado, idInstrumento);
        return profesores.Select(MapToResponse).ToList();
    }

    public async Task<ProfesorResponse?> GetByIdAsync(int id)
    {
        var profesor = await _repo.GetByIdAsync(id);
        return profesor is null ? null : MapToResponse(profesor);
    }

    public async Task<ProfesorResponse> CreateAsync(CrearProfesorRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Nombre))
            throw new ArgumentException("El nombre del profesor es obligatorio");

        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var persona = new Persona
            {
                Nombre = request.Nombre.Trim(),
                Apellido = request.Apellido.Trim(),
                Telefono = request.Telefono.Trim()
            };

            _context.Personas.Add(persona);
            await _context.SaveChangesAsync();

            var profesor = new Profesor
            {
                IdPersona = persona.IdPersona,
                Estado = "Activo",
                FechaRegistro = DateTime.UtcNow
            };

            await _repo.CreateAsync(profesor);

            if (request.IdsInstrumentos.Count != 0)
            {
                foreach (var idInst in request.IdsInstrumentos)
                {
                    var inst = await _instrumentoRepo.GetByIdAsync(idInst);
                    if (inst is null)
                        throw new ArgumentException($"El instrumento con ID {idInst} no existe");

                    _context.EspecialidadProfesores.Add(new EspecialidadProfesor
                    {
                        IdProfesor = profesor.IdProfesor,
                        IdInstrumento = idInst
                    });
                }
                await _context.SaveChangesAsync();
            }

            await transaction.CommitAsync();

            return (await GetByIdAsync(profesor.IdProfesor))!;
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    public async Task<ProfesorResponse?> UpdateAsync(int id, ActualizarProfesorRequest request)
    {
        var profesor = await _repo.GetByIdAsync(id);
        if (profesor is null) return null;

        if (!string.IsNullOrWhiteSpace(request.Nombre))
            profesor.Persona.Nombre = request.Nombre.Trim();

        if (!string.IsNullOrWhiteSpace(request.Apellido))
            profesor.Persona.Apellido = request.Apellido.Trim();

        if (!string.IsNullOrWhiteSpace(request.Telefono))
            profesor.Persona.Telefono = request.Telefono.Trim();

        _context.Personas.Update(profesor.Persona);
        await _repo.UpdateAsync(profesor);

        return MapToResponse(profesor);
    }

    public async Task<ProfesorResponse?> CambiarEstadoAsync(int id)
    {
        var profesor = await _repo.GetByIdAsync(id);
        if (profesor is null) return null;

        profesor.Estado = profesor.Estado == "Activo" ? "Inactivo" : "Activo";
        await _repo.UpdateAsync(profesor);

        return MapToResponse(profesor);
    }

    public async Task<ProfesorResponse?> AgregarEspecialidadAsync(int idProfesor, int idInstrumento)
    {
        var profesor = await _repo.GetByIdAsync(idProfesor);
        if (profesor is null) return null;

        var instrumento = await _instrumentoRepo.GetByIdAsync(idInstrumento);
        if (instrumento is null)
            throw new ArgumentException("El instrumento no existe");

        var yaTiene = profesor.Especialidades.Any(e => e.IdInstrumento == idInstrumento);
        if (yaTiene)
            throw new InvalidOperationException("El profesor ya tiene esa especialidad");

        _context.EspecialidadProfesores.Add(new EspecialidadProfesor
        {
            IdProfesor = idProfesor,
            IdInstrumento = idInstrumento
        });
        await _context.SaveChangesAsync();

        return await GetByIdAsync(idProfesor);
    }

    public async Task<bool> EliminarEspecialidadAsync(int idProfesor, int idInstrumento)
    {
        var especialidad = await _context.EspecialidadProfesores
            .FirstOrDefaultAsync(ep => ep.IdProfesor == idProfesor && ep.IdInstrumento == idInstrumento);

        if (especialidad is null) return false;

        _context.EspecialidadProfesores.Remove(especialidad);
        await _context.SaveChangesAsync();
        return true;
    }

    private static ProfesorResponse MapToResponse(Profesor p) => new()
    {
        IdProfesor = p.IdProfesor,
        IdPersona = p.IdPersona,
        NombreCompleto = $"{p.Persona.Nombre} {p.Persona.Apellido}",
        Telefono = p.Persona.Telefono,
        Estado = p.Estado,
        FechaRegistro = p.FechaRegistro,
        Especialidades = p.Especialidades.Select(e => new InstrumentoEspecialidadResponse
        {
            IdInstrumento = e.IdInstrumento,
            NombreInstrumento = e.Instrumento.Nombre
        }).ToList()
    };
}
