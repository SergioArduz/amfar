using AmfarAPI.Interfaces;
using AmfarAPI.Models;
using System;
using AmfarAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace AmfarAPI.Repositories
{
    public class PlanRepository : IPlanRepository
    {
        private readonly AppDbContext _context;

        public PlanRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Plan>> ObtenerTodos()
        {
            return await _context.Planes.ToListAsync();
        }

        public async Task<List<Plan>> ObtenerActivos()
        {
            return await _context.Planes
                .Where(p => p.Estado == "Activo")
                .ToListAsync();
        }

        public async Task<Plan> ObtenerPorCodigo(string codigo)
        {
            return await _context.Planes
                .FirstOrDefaultAsync(p => p.Codigo == codigo);
        }

        public async Task<Plan> Crear(Plan plan)
        {
            _context.Planes.Add(plan);
            await _context.SaveChangesAsync();
            return plan;
        }

        public async Task<Plan> Actualizar(Plan plan)
        {
            _context.Planes.Update(plan);
            await _context.SaveChangesAsync();
            return plan;
        }

        public async Task<bool> Desactivar(string codigo)
        {
            var plan = await ObtenerPorCodigo(codigo);

            if (plan == null)
            {
                return false;
            }

            plan.Estado = "Inactivo";
            await _context.SaveChangesAsync();

            return true;
        }
    }
}