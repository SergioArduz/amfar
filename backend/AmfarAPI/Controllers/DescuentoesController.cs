using AmfarAPI.DTOs;
using AmfarAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace AmfarAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DescuentoesController : ControllerBase
    {
        private readonly DescuentoService _descuentoService;

        public DescuentoesController(DescuentoService descuentoService)
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
                return NotFound("No se encontró el descuento.");

            return Ok(descuento);
        }

        [HttpPost]
        public async Task<ActionResult<DescuentoDTO>> Crear(DescuentoDTO dto)
        {
            var descuento = await _descuentoService.Crear(dto);
            return Ok(descuento);
        }

        [HttpPut("{codigo}")]
        public async Task<ActionResult<DescuentoDTO>> Actualizar(string codigo, DescuentoDTO dto)
        {
            var descuento = await _descuentoService.Actualizar(codigo, dto);

            if (descuento == null)
                return NotFound("No se encontró el descuento.");

            return Ok(descuento);
        }

        [HttpDelete("{codigo}")]
        public async Task<ActionResult> Desactivar(string codigo)
        {
            var resultado = await _descuentoService.Desactivar(codigo);

            if (!resultado)
                return NotFound("No se encontró el descuento.");

            return Ok("Descuento desactivado correctamente.");
        }
    }
}