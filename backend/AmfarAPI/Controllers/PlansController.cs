using AmfarAPI.Data;
using AmfarAPI.DTOs;
using AmfarAPI.Models;
using AmfarAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AmfarAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlansController : ControllerBase
    {
        private readonly PlanService _planService;

        public PlansController(PlanService planService)
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
                return NotFound("No se encontró el plan.");

            return Ok(plan);
        }

        [HttpPost]
        public async Task<ActionResult<PlanDTO>> Crear(PlanDTO dto)
        {
            var plan = await _planService.Crear(dto);
            return Ok(plan);
        }

        [HttpPut("{codigo}")]
        public async Task<ActionResult<PlanDTO>> Actualizar(string codigo, PlanDTO dto)
        {
            var plan = await _planService.Actualizar(codigo, dto);

            if (plan == null)
                return NotFound("No se encontró el plan.");

            return Ok(plan);
        }

        [HttpDelete("{codigo}")]
        public async Task<ActionResult> Desactivar(string codigo)
        {
            var resultado = await _planService.Desactivar(codigo);

            if (!resultado)
                return NotFound("No se encontró el plan.");

            return Ok("Plan desactivado correctamente.");
        }
    }
}
