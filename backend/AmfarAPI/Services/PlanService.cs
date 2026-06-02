using AmfarAPI.DTOs;
using AmfarAPI.Interfaces;
using AmfarAPI.Models;

namespace AmfarAPI.Services
{
    public class PlanService : IPlanService
    {
        private readonly IPlanRepository _planRepository;

        public PlanService(IPlanRepository planRepository)
        {
            _planRepository = planRepository;
        }

        public async Task<List<PlanDTO>> ObtenerTodos()
        {
            var planes = await _planRepository.ObtenerTodos();

            return planes.Select(p => new PlanDTO
            {
                Codigo = p.Codigo,
                NombrePlan = p.NombrePlan,
                Monto = p.Monto,
                HorasSemanales = p.HorasSemanales,
                HorasMensuales = p.HorasMensuales,
                EsIndividual = p.EsIndividual
            }).ToList();
        }

        public async Task<List<PlanDTO>> ObtenerActivos()
        {
            var planes = await _planRepository.ObtenerActivos();

            return planes.Select(p => new PlanDTO
            {
                Codigo = p.Codigo,
                NombrePlan = p.NombrePlan,
                Monto = p.Monto,
                HorasSemanales = p.HorasSemanales,
                HorasMensuales = p.HorasMensuales,
                EsIndividual = p.EsIndividual
            }).ToList();
        }

        public async Task<PlanDTO?> ObtenerPorCodigo(string codigo)
        {
            var plan = await _planRepository.ObtenerPorCodigo(codigo);

            if (plan == null)
                return null;

            return new PlanDTO
            {
                Codigo = plan.Codigo,
                NombrePlan = plan.NombrePlan,
                Monto = plan.Monto,
                HorasSemanales = plan.HorasSemanales,
                HorasMensuales = plan.HorasMensuales,
                EsIndividual = plan.EsIndividual
            };
        }

        public async Task<PlanDTO> Crear(PlanDTO dto)
        {
            var plan = new Plan
            {
                Codigo = dto.Codigo,
                NombrePlan = dto.NombrePlan,
                Monto = dto.Monto,
                HorasSemanales = dto.HorasSemanales,
                HorasMensuales = dto.HorasMensuales,
                EsIndividual = dto.EsIndividual,
                Estado = "Activo"
            };

            var creado = await _planRepository.Crear(plan);

            return new PlanDTO
            {
                Codigo = creado.Codigo,
                NombrePlan = creado.NombrePlan,
                Monto = creado.Monto,
                HorasSemanales = creado.HorasSemanales,
                HorasMensuales = creado.HorasMensuales,
                EsIndividual = creado.EsIndividual
            };
        }

        public async Task<PlanDTO?> Actualizar(string codigo, PlanDTO dto)
        {
            var plan = await _planRepository.ObtenerPorCodigo(codigo);

            if (plan == null)
                return null;

            plan.NombrePlan = dto.NombrePlan;
            plan.Monto = dto.Monto;
            plan.HorasSemanales = dto.HorasSemanales;
            plan.HorasMensuales = dto.HorasMensuales;
            plan.EsIndividual = dto.EsIndividual;

            var actualizado = await _planRepository.Actualizar(plan);

            return new PlanDTO
            {
                Codigo = actualizado.Codigo,
                NombrePlan = actualizado.NombrePlan,
                Monto = actualizado.Monto,
                HorasSemanales = actualizado.HorasSemanales,
                HorasMensuales = actualizado.HorasMensuales,
                EsIndividual = actualizado.EsIndividual
            };
        }

        public async Task<bool> Desactivar(string codigo)
        {
            return await _planRepository.Desactivar(codigo);
        }
    }
}
