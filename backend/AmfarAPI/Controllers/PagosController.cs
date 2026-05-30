using AmfarAPI.DTOs;
using AmfarAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace AmfarAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PagosController : ControllerBase
    {
        private readonly PagoService _pagoService;

        public PagosController(PagoService pagoService)
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
                return NotFound("No se encontró el pago.");

            return Ok(pago);
        }

        [HttpGet("inscripcion/{codigoInscripcion}")]
        public async Task<ActionResult<List<PagoDTO>>> ObtenerPorInscripcion(string codigoInscripcion)
        {
            return Ok(await _pagoService.ObtenerPorInscripcion(codigoInscripcion));
        }

        [HttpPost]
        public async Task<ActionResult<PagoDTO>> Crear(PagoDTO dto)
        {
            var pago = await _pagoService.Crear(dto);
            return Ok(pago);
        }

        [HttpPut("{codigo}/estado")]
        public async Task<ActionResult<PagoDTO>> ActualizarEstadoPago(
            string codigo,
            string estadoPago,
            string metodoPago)
        {
            var pago = await _pagoService.ActualizarEstadoPago(codigo, estadoPago, metodoPago);

            if (pago == null)
                return NotFound("No se encontró el pago.");

            return Ok(pago);
        }

        [HttpDelete("{codigo}")]
        public async Task<ActionResult> Desactivar(string codigo)
        {
            var resultado = await _pagoService.Desactivar(codigo);

            if (!resultado)
                return NotFound("No se encontró el pago.");

            return Ok("Pago desactivado correctamente.");
        }
    }
}