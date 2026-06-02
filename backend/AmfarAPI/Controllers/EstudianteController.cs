using AmfarAPI.DTOs.Estudiante;
using AmfarAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AmfarAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class EstudianteController : ControllerBase
{
    private readonly IEstudianteService _service;

    public EstudianteController(
        IEstudianteService service)
    {
        _service = service;
    }

    // ========================================
    // GET ALL
    // ========================================

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var estudiantes =
            await _service.GetAllAsync();

        return Ok(estudiantes);
    }

    // ========================================
    // GET BY ID
    // ========================================

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var estudiante =
            await _service.GetByIdAsync(id);

        if (estudiante == null)
        {
            return NotFound(new
            {
                mensaje = "Estudiante no encontrado"
            });
        }

        return Ok(estudiante);
    }

    // ========================================
    // CREATE
    // ========================================

    [Authorize(Roles =
        "Administrador,Directora,Secretaria")]
    [HttpPost]
    public async Task<IActionResult> Create(
        CreateEstudianteDto dto)
    {
        await _service.CreateAsync(dto);

        return Ok(new
        {
            mensaje = "Estudiante creado correctamente"
        });
    }

    // ========================================
    // UPDATE
    // ========================================

    [Authorize(Roles =
        "Administrador,Directora,Secretaria")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int id,
        UpdateEstudianteDto dto)
    {
        await _service.UpdateAsync(id, dto);

        return Ok(new
        {
            mensaje = "Estudiante actualizado"
        });
    }

    // ========================================
    // DELETE
    // ========================================

    [Authorize(Roles =
        "Administrador,Directora,Secretaria")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteAsync(id);

        return Ok(new
        {
            mensaje = "Estudiante eliminado correctamente"
        });
    }

    // ========================================
    // ASIGNAR TUTOR
    // ========================================

    [Authorize(Roles =
        "Administrador,Directora,Secretaria")]
    [HttpPost("{id}/tutores")]
    public async Task<IActionResult> AsignarTutor(
        int id,
        AsignarTutorDto dto)
    {
        await _service.AsignarTutorAsync(id, dto);

        return Ok(new
        {
            mensaje = "Tutor asignado correctamente"
        });
    }
}