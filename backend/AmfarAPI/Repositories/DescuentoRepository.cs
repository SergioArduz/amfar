using AmfarAPI.Models;
using AmfarAPI.Interfaces;
using AmfarAPI.Data;
using System;
using Microsoft.EntityFrameworkCore;

namespace AmfarAPI.Repositories
{
    public class DescuentoRepository : IDescuentoRepository
    {
        private readonly AppDbContext _context;

        public DescuentoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Descuento>> ObtenerTodos()
        {
            return await _context.Descuentos.ToListAsync();
        }

        public async Task<List<Descuento>> ObtenerActivos()
        {
            return await _context.Descuentos
                .Where(d => d.Estado == "Activo")
                .ToListAsync();
        }

        public async Task<Descuento> ObtenerPorCodigo(string codigo)
        {
            return await _context.Descuentos
                .FirstOrDefaultAsync(d => d.Codigo == codigo);
        }

        public async Task<Descuento> Crear(Descuento descuento)
        {
            _context.Descuentos.Add(descuento);
            await _context.SaveChangesAsync();
            return descuento;
        }

        public async Task<Descuento> Actualizar(Descuento descuento)
        {
            _context.Descuentos.Update(descuento);
            await _context.SaveChangesAsync();
            return descuento;
        }

        public async Task<bool> Desactivar(string codigo)
        {
            var descuento = await ObtenerPorCodigo(codigo);

            if (descuento == null)
            {
                return false;
            }

            descuento.Estado = "Inactivo";
            await _context.SaveChangesAsync();

            return true;
        }
    }
}