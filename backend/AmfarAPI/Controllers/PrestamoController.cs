using AmfarAPI.DTOs;
using AmfarAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AmfarAPI.Controllers;

[ApiController]
[Route("api/prestamos")]
[Authorize]
public class PrestamoController : ControllerBase
{
    private readonly IPrestamoService _service;

    public PrestamoController(IPrestamoService service)
    {
        _service = service;
    }

    [Authorize(Roles = "Administrador,Directora,Secretaria")]
    [HttpPost]
    public async Task<ActionResult<PrestamoResponse>> Create([FromBody] CrearPrestamoRequest request)
    {
        try
        {
            var result = await _service.CreateAsync(request);
            return CreatedAtAction(nameof(GetByInscripcion), new { idInscripcion = result.IdInscripcion }, result);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { mensaje = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { mensaje = ex.Message });
        }
    }

    [HttpGet("inscripcion/{idInscripcion}")]
    public async Task<ActionResult<List<PrestamoResponse>>> GetByInscripcion(int idInscripcion)
    {
        var result = await _service.GetByInscripcionAsync(idInscripcion);
        return Ok(result);
    }

    [Authorize(Roles = "Administrador,Directora,Secretaria")]
    [HttpPut("{id}/devolucion")]
    public async Task<ActionResult<PrestamoResponse>> Devolver(int id, [FromBody] DevolucionRequest request)
    {
        try
        {
            var result = await _service.DevolverAsync(id, request);
            if (result is null) return NotFound(new { mensaje = "Prestamo no encontrado" });
            return Ok(result);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { mensaje = ex.Message });
        }
    }

    [HttpGet("verificar-disponibilidad/{idInstrumento}")]
    public async Task<ActionResult> VerificarDisponibilidad(int idInstrumento)
    {
        var disponible = await _service.VerificarDisponibilidadAsync(idInstrumento);
        return Ok(new { idInstrumento, disponible });
    }
}
