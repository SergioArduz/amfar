using AmfarAPI.DTOs.Usuario;
using AmfarAPI.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace AmfarAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UsuarioController : ControllerBase
{
    private readonly IUsuarioService _service;

    public UsuarioController(IUsuarioService service)
    {
        _service = service;
    }

    // =========================================
    // GET ALL
    // =========================================

    [Authorize(Roles = "Administrador,Directora")]
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var usuarios = await _service.GetAllAsync();

        return Ok(usuarios);
    }


    // =========================================
    // GET BY ID
    // =========================================

    [Authorize(Roles = "Administrador,Directora")]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var usuario = await _service.GetByIdAsync(id);

        if (usuario == null)
        {
            return NotFound(new
            {
                mensaje = "Usuario no encontrado"
            });
        }

        return Ok(usuario);
    }


    // =========================================
    // CREATE
    // =========================================

    [Authorize(Roles = "Administrador")]
    [HttpPost]
    public async Task<IActionResult> Create(CreateUsuarioDto dto)
    {
        try
        {
            await _service.CreateAsync(dto);

            return Ok(new
            {
                mensaje = "Usuario creado correctamente"
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


    // =========================================
    // UPDATE
    // =========================================

    [Authorize(Roles = "Administrador")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int id,
        UpdateUsuarioDto dto)
    {
        try
        {
            await _service.UpdateAsync(id, dto);

            return Ok(new
            {
                mensaje = "Usuario actualizado correctamente"
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

    // =========================================
    // TOGGLE ESTADO
    // =========================================

    [Authorize(Roles = "Administrador")]
    [HttpPatch("{id}/estado")]
    public async Task<IActionResult> ToggleEstado(int id)
    {
        await _service.ToggleEstadoAsync(id);

        return Ok(new
        {
            mensaje = "Estado de usuario actualizado correctamente"
        });
    }

    // =========================================
    // DELETE
    // =========================================

    [Authorize(Roles = "Administrador")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteAsync(id);

        return Ok(new
        {
            mensaje = "Usuario eliminado correctamente"
        });
    }
}
