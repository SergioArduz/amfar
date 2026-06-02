using AmfarAPI.Data;
using AmfarAPI.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AmfarAPI.Controllers;

[Route("api/calendario")]
[ApiController]
[Authorize]
public class CalendarioController : ControllerBase
{
    private readonly AppDbContext _context;

    public CalendarioController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<CalendarioClaseDTO>>> ObtenerClases(
        [FromQuery] int? profesorId,
        [FromQuery] string? instrumento,
        [FromQuery] string? alumno,
        [FromQuery] string? diaSemana)
    {
        var query = _context.InscripcionClases
            .Include(c => c.Inscripcion)
            .Where(c => c.Estado == "Activo")
            .AsQueryable();

        if (profesorId.HasValue)
        {
            var codigoProfesor = profesorId.Value.ToString();
            query = query.Where(c => c.CodigoProfesor == codigoProfesor);
        }

        if (!string.IsNullOrEmpty(instrumento))
        {
            query = query.Where(c => c.CodigoInstrumento != null && c.CodigoInstrumento == instrumento);
        }

        if (!string.IsNullOrEmpty(alumno))
        {
            query = query.Where(c => c.Inscripcion.CodigoEstudiante == alumno);
        }

        if (!string.IsNullOrEmpty(diaSemana))
        {
            query = query.Where(c => c.DiaSemana == diaSemana);
        }

        var clases = await query
            .OrderBy(c => c.DiaSemana)
            .ThenBy(c => c.HoraInicio)
            .ToListAsync();

        var resultado = clases.Select(c => new CalendarioClaseDTO
        {
            CodigoInscripcion = c.Inscripcion.Codigo,
            DiaSemana = c.DiaSemana,
            HoraInicio = c.HoraInicio.ToString(),
            HoraFin = c.HoraFin.ToString(),
            CodigoProfesor = c.CodigoProfesor,
            CodigoInstrumento = c.CodigoInstrumento,
            InstrumentoPrestado = c.InstrumentoPrestado,
            Estado = c.Estado
        }).ToList();

        return Ok(resultado);
    }
}
