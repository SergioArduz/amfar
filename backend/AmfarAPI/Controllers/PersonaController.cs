using AmfarAPI.DTOs.Persona;
using AmfarAPI.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AmfarAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PersonaController : ControllerBase
{
    private readonly IPersonaService _service;

    public PersonaController(IPersonaService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var personas = await _service.GetAllAsync();

        return Ok(personas);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var persona = await _service.GetByIdAsync(id);

        if (persona == null)
            return NotFound();

        return Ok(persona);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreatePersonaDto dto)
    {
        await _service.CreateAsync(dto);

        return Ok(new
        {
            mensaje = "Persona creada correctamente"
        });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdatePersonaDto dto)
    {
        await _service.UpdateAsync(id, dto);

        return Ok(new
        {
            mensaje = "Persona actualizada correctamente"
        });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteAsync(id);

        return Ok(new
        {
            mensaje = "Persona eliminada correctamente"
        });
    }
}