using AmfarAPI.DTOs;
using AmfarAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AmfarAPI.Controllers;

[Route("api/inscripciones")]
[ApiController]
[Authorize]
public class InscripcionesController : ControllerBase
{
    private readonly IInscripcionService _inscripcionService;

    public InscripcionesController(IInscripcionService inscripcionService)
    {
        _inscripcionService = inscripcionService;
    }

    [HttpGet]
    public async Task<ActionResult<List<InscripcionDTO>>> ObtenerTodas()
    {
        return Ok(await _inscripcionService.ObtenerTodas());
    }

    [HttpGet("activas")]
    public async Task<ActionResult<List<InscripcionDTO>>> ObtenerActivas()
    {
        return Ok(await _inscripcionService.ObtenerActivas());
    }

    [HttpGet("{codigo}")]
    public async Task<ActionResult<InscripcionDTO>> ObtenerPorCodigo(string codigo)
    {
        var inscripcion = await _inscripcionService.ObtenerPorCodigo(codigo);

        if (inscripcion == null)
            return NotFound(new { mensaje = "Inscripción no encontrada." });

        return Ok(inscripcion);
    }

    [Authorize(Roles = "Administrador,Directora,Secretaria")]
    [HttpPost]
    public async Task<ActionResult<InscripcionDTO>> Crear(InscripcionDTO dto)
    {
        var inscripcion = await _inscripcionService.Crear(dto);

        if (inscripcion == null)
            return BadRequest(new { mensaje = "No se pudo registrar la inscripción. Revisa plan, descuento o conflictos de horario." });

        return CreatedAtAction(nameof(ObtenerPorCodigo), new { codigo = inscripcion.Codigo }, inscripcion);
    }

    [Authorize(Roles = "Administrador,Directora,Secretaria")]
    [HttpDelete("{codigo}")]
    public async Task<ActionResult> Desactivar(string codigo)
    {
        var resultado = await _inscripcionService.Desactivar(codigo);

        if (!resultado)
            return NotFound(new { mensaje = "Inscripción no encontrada." });

        return Ok(new { mensaje = "Inscripción desactivada correctamente." });
    }
}
