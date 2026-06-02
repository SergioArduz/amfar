using AmfarAPI.DTOs;
using AmfarAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AmfarAPI.Controllers;

[ApiController]
[Route("api/instrumentos")]
[Authorize]
public class InstrumentoController : ControllerBase
{
    private readonly IInstrumentoService _service;

    public InstrumentoController(IInstrumentoService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<InstrumentoResponse>>> GetAll(
        [FromQuery] string? estado,
        [FromQuery] string? tipo)
    {
        var result = await _service.GetAllAsync(estado, tipo);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<InstrumentoResponse>> GetById(int id)
    {
        var result = await _service.GetByIdAsync(id);
        if (result is null) return NotFound();
        return Ok(result);
    }

    [Authorize(Roles = "Administrador,Directora")]
    [HttpPost]
    public async Task<ActionResult<InstrumentoResponse>> Create([FromBody] CrearInstrumentoRequest request)
    {
        try
        {
            var result = await _service.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = result.IdInstrumento }, result);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { mensaje = ex.Message });
        }
    }

    [Authorize(Roles = "Administrador,Directora")]
    [HttpPut("{id}")]
    public async Task<ActionResult<InstrumentoResponse>> Update(int id, [FromBody] ActualizarInstrumentoRequest request)
    {
        var result = await _service.UpdateAsync(id, request);
        if (result is null) return NotFound();
        return Ok(result);
    }

    [Authorize(Roles = "Administrador,Directora")]
    [HttpPatch("{id}/estado")]
    public async Task<ActionResult<InstrumentoResponse>> CambiarEstado(int id, [FromBody] CambiarEstadoInstrumentoRequest request)
    {
        try
        {
            var result = await _service.CambiarEstadoAsync(id, request);
            if (result is null) return NotFound();
            return Ok(result);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { mensaje = ex.Message });
        }
    }

    [HttpGet("disponibilidad")]
    public async Task<ActionResult<List<DisponibilidadResponse>>> CheckDisponibilidad([FromQuery] DateTime? fecha)
    {
        var result = await _service.CheckDisponibilidadAsync(fecha);
        return Ok(result);
    }
}
