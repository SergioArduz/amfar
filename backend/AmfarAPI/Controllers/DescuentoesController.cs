using AmfarAPI.DTOs;
using AmfarAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AmfarAPI.Controllers;

[Route("api/descuentos")]
[ApiController]
[Authorize]
public class DescuentosController : ControllerBase
{
    private readonly IDescuentoService _descuentoService;

    public DescuentosController(IDescuentoService descuentoService)
    {
        _descuentoService = descuentoService;
    }

    [HttpGet]
    public async Task<ActionResult<List<DescuentoDTO>>> ObtenerTodos()
    {
        return Ok(await _descuentoService.ObtenerTodos());
    }

    [HttpGet("activos")]
    public async Task<ActionResult<List<DescuentoDTO>>> ObtenerActivos()
    {
        return Ok(await _descuentoService.ObtenerActivos());
    }

    [HttpGet("{codigo}")]
    public async Task<ActionResult<DescuentoDTO>> ObtenerPorCodigo(string codigo)
    {
        var descuento = await _descuentoService.ObtenerPorCodigo(codigo);

        if (descuento == null)
            return NotFound(new { mensaje = "Descuento no encontrado." });

        return Ok(descuento);
    }

    [Authorize(Roles = "Administrador,Directora")]
    [HttpPost]
    public async Task<ActionResult<DescuentoDTO>> Crear(DescuentoDTO dto)
    {
        var descuento = await _descuentoService.Crear(dto);
        return CreatedAtAction(nameof(ObtenerPorCodigo), new { codigo = descuento.Codigo }, descuento);
    }

    [Authorize(Roles = "Administrador,Directora")]
    [HttpPut("{codigo}")]
    public async Task<ActionResult<DescuentoDTO>> Actualizar(string codigo, DescuentoDTO dto)
    {
        var descuento = await _descuentoService.Actualizar(codigo, dto);

        if (descuento == null)
            return NotFound(new { mensaje = "Descuento no encontrado." });

        return Ok(descuento);
    }

    [Authorize(Roles = "Administrador,Directora")]
    [HttpDelete("{codigo}")]
    public async Task<ActionResult> Desactivar(string codigo)
    {
        var resultado = await _descuentoService.Desactivar(codigo);

        if (!resultado)
            return NotFound(new { mensaje = "Descuento no encontrado." });

        return Ok(new { mensaje = "Descuento desactivado correctamente." });
    }
}
