using System.Security.Claims;
using AmfarAPI.Data;
using AmfarAPI.DTOs;
using AmfarAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AmfarAPI.Controllers;

[ApiController]
[Route("api/profesores")]
[Authorize]
public class ProfesorController : ControllerBase
{
    private readonly IProfesorService _service;
    private readonly AppDbContext _context;

    public ProfesorController(IProfesorService service, AppDbContext context)
    {
        _service = service;
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<ProfesorResponse>>> GetAll(
        [FromQuery] string? estado,
        [FromQuery] int? idInstrumento)
    {
        var result = await _service.GetAllAsync(estado, idInstrumento);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProfesorResponse>> GetById(int id)
    {
        var result = await _service.GetByIdAsync(id);
        if (result is null) return NotFound(new { mensaje = "Profesor no encontrado" });
        return Ok(result);
    }

    [Authorize(Roles = "Administrador,Directora")]
    [HttpPost]
    public async Task<ActionResult<ProfesorResponse>> Create([FromBody] CrearProfesorRequest request)
    {
        try
        {
            var result = await _service.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = result.IdProfesor }, result);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { mensaje = ex.Message });
        }
    }

    [Authorize(Roles = "Administrador,Directora")]
    [HttpPut("{id}")]
    public async Task<ActionResult<ProfesorResponse>> Update(int id, [FromBody] ActualizarProfesorRequest request)
    {
        var result = await _service.UpdateAsync(id, request);
        if (result is null) return NotFound(new { mensaje = "Profesor no encontrado" });
        return Ok(result);
    }

    [Authorize(Roles = "Administrador,Directora")]
    [HttpPatch("{id}/estado")]
    public async Task<ActionResult<ProfesorResponse>> ToggleEstado(int id)
    {
        var result = await _service.CambiarEstadoAsync(id);
        if (result is null) return NotFound(new { mensaje = "Profesor no encontrado" });
        return Ok(result);
    }

    [Authorize(Roles = "Administrador,Directora")]
    [HttpPost("{id}/especialidades")]
    public async Task<ActionResult<ProfesorResponse>> AgregarEspecialidad(int id, [FromBody] AgregarEspecialidadRequest request)
    {
        try
        {
            var result = await _service.AgregarEspecialidadAsync(id, request.IdInstrumento);
            if (result is null) return NotFound(new { mensaje = "Profesor no encontrado" });
            return Ok(result);
        }
        catch (Exception ex) when (ex is ArgumentException or InvalidOperationException)
        {
            return BadRequest(new { mensaje = ex.Message });
        }
    }

    [Authorize(Roles = "Profesor")]
    [HttpGet("mis-alumnos")]
    public async Task<ActionResult<List<AlumnoProfesorDTO>>> GetMisAlumnos()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var idUsuario))
            return Unauthorized(new { mensaje = "No se pudo identificar al usuario." });

        var usuario = await _context.Usuarios
            .Include(u => u.Persona)
            .FirstOrDefaultAsync(u => u.IdUsuario == idUsuario);

        if (usuario == null)
            return Unauthorized();

        var profesor = await _context.Profesores
            .FirstOrDefaultAsync(p => p.IdPersona == usuario.IdPersona);

        if (profesor == null)
            return NotFound(new { mensaje = "No tienes un perfil de profesor asociado." });

        var codigoProfesor = profesor.IdProfesor.ToString();

        var clases = await _context.InscripcionClases
            .Include(c => c.Inscripcion)
            .Where(c => c.CodigoProfesor == codigoProfesor && c.Estado == "Activo")
            .OrderBy(c => c.DiaSemana)
            .ThenBy(c => c.HoraInicio)
            .ToListAsync();

        var resultado = clases.Select(c => new AlumnoProfesorDTO
        {
            CodigoInscripcion = c.Inscripcion.Codigo,
            CodigoEstudiante = c.Inscripcion.CodigoEstudiante,
            DiaSemana = c.DiaSemana,
            HoraInicio = c.HoraInicio.ToString(),
            HoraFin = c.HoraFin.ToString(),
            CodigoInstrumento = c.CodigoInstrumento,
            InstrumentoPrestado = c.InstrumentoPrestado,
            Modalidad = c.Inscripcion.Modalidad
        }).ToList();

        return Ok(resultado);
    }

    [Authorize(Roles = "Administrador,Directora")]
    [HttpDelete("{id}/especialidades/{idInstrumento}")]
    public async Task<ActionResult> EliminarEspecialidad(int id, int idInstrumento)
    {
        var result = await _service.EliminarEspecialidadAsync(id, idInstrumento);
        if (!result) return NotFound(new { mensaje = "Especialidad no encontrada" });
        return NoContent();
    }
}
