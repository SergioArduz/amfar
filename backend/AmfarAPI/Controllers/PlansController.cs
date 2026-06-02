using AmfarAPI.DTOs;
using AmfarAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AmfarAPI.Controllers;

[Route("api/planes")]
[ApiController]
[Authorize]
public class PlansController : ControllerBase
{
    private readonly IPlanService _planService;

    public PlansController(IPlanService planService)
    {
        _planService = planService;
    }

    [HttpGet]
    public async Task<ActionResult<List<PlanDTO>>> ObtenerTodos()
    {
        return Ok(await _planService.ObtenerTodos());
    }

    [HttpGet("activos")]
    public async Task<ActionResult<List<PlanDTO>>> ObtenerActivos()
    {
        return Ok(await _planService.ObtenerActivos());
    }

    [HttpGet("{codigo}")]
    public async Task<ActionResult<PlanDTO>> ObtenerPorCodigo(string codigo)
    {
        var plan = await _planService.ObtenerPorCodigo(codigo);

        if (plan == null)
            return NotFound(new { mensaje = "Plan no encontrado." });

        return Ok(plan);
    }

    [Authorize(Roles = "Administrador,Directora")]
    [HttpPost]
    public async Task<ActionResult<PlanDTO>> Crear(PlanDTO dto)
    {
        var plan = await _planService.Crear(dto);
        return CreatedAtAction(nameof(ObtenerPorCodigo), new { codigo = plan.Codigo }, plan);
    }

    [Authorize(Roles = "Administrador,Directora")]
    [HttpPut("{codigo}")]
    public async Task<ActionResult<PlanDTO>> Actualizar(string codigo, PlanDTO dto)
    {
        var plan = await _planService.Actualizar(codigo, dto);

        if (plan == null)
            return NotFound(new { mensaje = "Plan no encontrado." });

        return Ok(plan);
    }

    [Authorize(Roles = "Administrador,Directora")]
    [HttpDelete("{codigo}")]
    public async Task<ActionResult> Desactivar(string codigo)
    {
        var resultado = await _planService.Desactivar(codigo);

        if (!resultado)
            return NotFound(new { mensaje = "Plan no encontrado." });

        return Ok(new { mensaje = "Plan desactivado correctamente." });
    }
}
