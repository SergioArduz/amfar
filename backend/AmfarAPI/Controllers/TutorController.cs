using AmfarAPI.DTOs.Tutor;
using AmfarAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AmfarAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TutorController : ControllerBase
{
    private readonly ITutorService _service;

    public TutorController(ITutorService service)
    {
        _service = service;
    }

    // ========================================
    // GET ALL
    // ========================================

    [Authorize(
        Roles =
        "Administrador,Directora,Secretaria,Profesor"
    )]
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var tutores = await _service.GetAllAsync();

        return Ok(tutores);
    }

    // ========================================
    // GET BY ID
    // ========================================

    [Authorize(
        Roles =
        "Administrador,Directora,Secretaria,Profesor"
    )]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var tutor = await _service.GetByIdAsync(id);

        if (tutor == null)
        {
            return NotFound(new
            {
                mensaje = "Tutor no encontrado"
            });
        }

        return Ok(tutor);
    }

    // ========================================
    // CREATE
    // ========================================

    [Authorize(
        Roles =
        "Administrador,Directora,Secretaria"
    )]
    [HttpPost]
    public async Task<IActionResult> Create(
        CreateTutorDto dto)
    {
        try
        {
            await _service.CreateAsync(dto);

            return Ok(new
            {
                mensaje = "Tutor creado correctamente"
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new
            {
                mensaje = ex.Message
            });
        }
    }

    // ========================================
    // UPDATE
    // ========================================

    [Authorize(
        Roles =
        "Administrador,Directora,Secretaria"
    )]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int id,
        UpdateTutorDto dto)
    {
        try
        {
            await _service.UpdateAsync(id, dto);

            return Ok(new
            {
                mensaje =
                    "Tutor actualizado correctamente"
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new
            {
                mensaje = ex.Message
            });
        }
    }

    // ========================================
    // DELETE
    // ========================================

    [Authorize(
        Roles =
        "Administrador,Directora,Secretaria"
    )]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteAsync(id);

        return Ok(new
        {
            mensaje = "Tutor eliminado correctamente"
        });
    }
}