using AmfarAPI.DTOs;
using AmfarAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace AmfarAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InscripcionsController : ControllerBase
    {
        private readonly InscripcionService _inscripcionService;

        public InscripcionsController(InscripcionService inscripcionService)
        {
            _inscripcionService = inscripcionService;
        }

        [HttpGet]
        public async Task<ActionResult<List<InscripcionDTO>>> ObtenerTodas()
        {
            return Ok(await _inscripcionService.ObtenerTodas());
        }

        [HttpGet("activas")]
        public async Task<ActionResult<List<InscripcionDTO>>> ObtenerActivas()
        {
            return Ok(await _inscripcionService.ObtenerActivas());
        }

        [HttpGet("{codigo}")]
        public async Task<ActionResult<InscripcionDTO>> ObtenerPorCodigo(string codigo)
        {
            var inscripcion = await _inscripcionService.ObtenerPorCodigo(codigo);

            if (inscripcion == null)
                return NotFound("No se encontró la inscripción.");

            return Ok(inscripcion);
        }

        [HttpPost]
        public async Task<ActionResult<InscripcionDTO>> Crear(InscripcionDTO dto)
        {
            var inscripcion = await _inscripcionService.Crear(dto);

            if (inscripcion == null)
                return BadRequest("No se pudo registrar la inscripción. Revisa plan, descuento o conflictos de horario.");

            return Ok(inscripcion);
        }

        [HttpDelete("{codigo}")]
        public async Task<ActionResult> Desactivar(string codigo)
        {
            var resultado = await _inscripcionService.Desactivar(codigo);

            if (!resultado)
                return NotFound("No se encontró la inscripción.");

            return Ok("Inscripción desactivada correctamente.");
        }
    }
}