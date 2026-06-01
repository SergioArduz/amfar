using Microsoft.AspNetCore.Mvc;
using AmfarAPI.Models;

namespace AmfarAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReciboController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new List<Recibo>());
    }

    [HttpGet("imprimir/{id}")]
    public IActionResult Imprimir(int id)
    {
        return Ok(new { mensaje = "Recibo listo para imprimir" });
    }
}