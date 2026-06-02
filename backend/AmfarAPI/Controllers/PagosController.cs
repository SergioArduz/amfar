using AmfarAPI.DTOs;
using AmfarAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AmfarAPI.Controllers;

[Route("api/pagos")]
[ApiController]
[Authorize]
public class PagosController : ControllerBase
{
    private readonly IPagoService _pagoService;

    public PagosController(IPagoService pagoService)
    {
        _pagoService = pagoService;
    }

    [HttpGet]
    public async Task<ActionResult<List<PagoDTO>>> ObtenerTodos()
    {
        return Ok(await _pagoService.ObtenerTodos());
    }

    [HttpGet("activos")]
    public async Task<ActionResult<List<PagoDTO>>> ObtenerActivos()
    {
        return Ok(await _pagoService.ObtenerActivos());
    }

    [HttpGet("{codigo}")]
    public async Task<ActionResult<PagoDTO>> ObtenerPorCodigo(string codigo)
    {
        var pago = await _pagoService.ObtenerPorCodigo(codigo);

        if (pago == null)
            return NotFound(new { mensaje = "Pago no encontrado." });

        return Ok(pago);
    }

    [HttpGet("inscripcion/{codigoInscripcion}")]
    public async Task<ActionResult<List<PagoDTO>>> ObtenerPorInscripcion(string codigoInscripcion)
    {
        return Ok(await _pagoService.ObtenerPorInscripcion(codigoInscripcion));
    }

    [Authorize(Roles = "Administrador,Directora,Secretaria")]
    [HttpPost]
    public async Task<ActionResult<PagoDTO>> Crear(PagoDTO dto)
    {
        var pago = await _pagoService.Crear(dto);
        return CreatedAtAction(nameof(ObtenerPorCodigo), new { codigo = pago.Codigo }, pago);
    }

    [Authorize(Roles = "Administrador,Directora,Secretaria")]
    [HttpPut("{codigo}/estado")]
    public async Task<ActionResult<PagoDTO>> ActualizarEstadoPago(
        string codigo,
        [FromBody] ActualizarEstadoPagoRequest request)
    {
        var pago = await _pagoService.ActualizarEstadoPago(codigo, request.EstadoPago, request.MetodoPago);

        if (pago == null)
            return NotFound(new { mensaje = "Pago no encontrado." });

        return Ok(pago);
    }

    [Authorize(Roles = "Administrador")]
    [HttpDelete("{codigo}")]
    public async Task<ActionResult> Desactivar(string codigo)
    {
        var resultado = await _pagoService.Desactivar(codigo);

        if (!resultado)
            return NotFound(new { mensaje = "Pago no encontrado." });

        return Ok(new { mensaje = "Pago desactivado correctamente." });
    }
}
