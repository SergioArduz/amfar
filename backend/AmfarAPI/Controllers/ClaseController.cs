using Microsoft.AspNetCore.Mvc;
using AmfarAPI.Models;

namespace AmfarAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClaseController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new List<Clase>());
    }

    [HttpGet("calendario")]
    public IActionResult Calendario()
    {
        return Ok();
    }
}