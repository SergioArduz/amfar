using AmfarAPI.DTOs;
using AmfarAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace AmfarAPI.Controllers;

[ApiController]
[Route("api/profesores")]
public class ProfesorController : ControllerBase
{
    private readonly IProfesorService _service;

    public ProfesorController(IProfesorService service)
    {
        _service = service;
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

    [HttpPut("{id}")]
    public async Task<ActionResult<ProfesorResponse>> Update(int id, [FromBody] ActualizarProfesorRequest request)
    {
        var result = await _service.UpdateAsync(id, request);
        if (result is null) return NotFound(new { mensaje = "Profesor no encontrado" });
        return Ok(result);
    }

    [HttpPatch("{id}/estado")]
    public async Task<ActionResult<ProfesorResponse>> ToggleEstado(int id)
    {
        var result = await _service.CambiarEstadoAsync(id);
        if (result is null) return NotFound(new { mensaje = "Profesor no encontrado" });
        return Ok(result);
    }

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

    [HttpDelete("{id}/especialidades/{idInstrumento}")]
    public async Task<ActionResult> EliminarEspecialidad(int id, int idInstrumento)
    {
        var result = await _service.EliminarEspecialidadAsync(id, idInstrumento);
        if (!result) return NotFound(new { mensaje = "Especialidad no encontrada" });
        return NoContent();
    }
}
