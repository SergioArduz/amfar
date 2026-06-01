using AmfarAPI.Data;
using AmfarAPI.Interfaces;
using AmfarAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AmfarAPI.Repositories
{
    public class PagoRepository : IPagoRepository
    {
        private readonly AppDbContext _context;

        public PagoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Pago>> ObtenerTodos()
        {
            return await _context.Pagos.ToListAsync();
        }

        public async Task<List<Pago>> ObtenerActivos()
        {
            return await _context.Pagos
                .Where(p => p.Estado == "Activo")
                .ToListAsync();
        }

        public async Task<Pago?> ObtenerPorCodigo(string codigo)
        {
            return await _context.Pagos
                .FirstOrDefaultAsync(p => p.Codigo == codigo);
        }

        public async Task<List<Pago>> ObtenerPorInscripcion(string codigoInscripcion)
        {
            return await _context.Pagos
                .Where(p => p.CodigoInscripcion == codigoInscripcion)
                .ToListAsync();
        }

        public async Task<Pago> Crear(Pago pago)
        {
            _context.Pagos.Add(pago);
            await _context.SaveChangesAsync();
            return pago;
        }

        public async Task<Pago> Actualizar(Pago pago)
        {
            _context.Pagos.Update(pago);
            await _context.SaveChangesAsync();
            return pago;
        }

        public async Task<bool> Desactivar(string codigo)
        {
            var pago = await ObtenerPorCodigo(codigo);

            if (pago == null)
                return false;

            pago.Estado = "Inactivo";

            await _context.SaveChangesAsync();
            return true;
        }
    }
}