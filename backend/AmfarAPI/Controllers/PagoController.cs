using Microsoft.AspNetCore.Mvc;
using AmfarAPI.Models;

namespace AmfarAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PagoController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new List<Pago>());
    }

    [HttpPost]
    public IActionResult Crear(Pago pago)
    {
        return Ok(pago);
    }

    [HttpPut("pagar/{id}")]
    public IActionResult Pagar(int id)
    {
        return Ok(new { mensaje = "Pago realizado y recibo generado" });
    }
}