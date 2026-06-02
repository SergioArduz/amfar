using System.Security.Claims;
using AmfarAPI.DTOs;
using AmfarAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AmfarAPI.Controllers;

[Route("api/recibos")]
[ApiController]
[Authorize]
public class RecibosController : ControllerBase
{
    private readonly IReciboService _reciboService;

    public RecibosController(IReciboService reciboService)
    {
        _reciboService = reciboService;
    }

    [HttpGet]
    public async Task<ActionResult<List<ReciboDTO>>> ObtenerTodos()
    {
        return Ok(await _reciboService.ObtenerTodos());
    }

    [HttpGet("{numeroRecibo}")]
    public async Task<ActionResult<ReciboDTO>> ObtenerPorNumero(string numeroRecibo)
    {
        var recibo = await _reciboService.ObtenerPorNumero(numeroRecibo);

        if (recibo == null)
            return NotFound(new { mensaje = "Recibo no encontrado." });

        return Ok(recibo);
    }

    [HttpGet("pago/{codigoPago}")]
    public async Task<ActionResult<List<ReciboDTO>>> ObtenerPorPago(string codigoPago)
    {
        return Ok(await _reciboService.ObtenerPorPago(codigoPago));
    }

    [Authorize(Roles = "Administrador,Directora,Secretaria")]
    [HttpPost("generar/{codigoPago}")]
    public async Task<ActionResult<ReciboDTO>> Generar(string codigoPago)
    {
        var emitidoPor = User.FindFirst(ClaimTypes.Email)?.Value ?? "Sistema";

        var recibo = await _reciboService.Generar(codigoPago, emitidoPor);

        if (recibo == null)
            return BadRequest(new { mensaje = "No se pudo generar el recibo. Verifica que el pago exista, esté en estado 'Pagado' y no tenga ya un recibo activo." });

        return CreatedAtAction(nameof(ObtenerPorNumero), new { numeroRecibo = recibo.NumeroRecibo }, recibo);
    }
}
