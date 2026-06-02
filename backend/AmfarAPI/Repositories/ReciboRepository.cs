using AmfarAPI.Data;
using AmfarAPI.Interfaces;
using AmfarAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AmfarAPI.Repositories
{
    public class ReciboRepository : IReciboRepository
    {
        private readonly AppDbContext _context;

        public ReciboRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Recibo>> ObtenerTodos()
        {
            return await _context.Recibos
                .OrderByDescending(r => r.FechaEmision)
                .ToListAsync();
        }

        public async Task<Recibo?> ObtenerPorNumero(string numeroRecibo)
        {
            return await _context.Recibos
                .FirstOrDefaultAsync(r => r.NumeroRecibo == numeroRecibo);
        }

        public async Task<List<Recibo>> ObtenerPorPago(string codigoPago)
        {
            return await _context.Recibos
                .Where(r => r.CodigoPago == codigoPago)
                .OrderByDescending(r => r.FechaEmision)
                .ToListAsync();
        }

        public async Task<Recibo> Crear(Recibo recibo)
        {
            _context.Recibos.Add(recibo);
            await _context.SaveChangesAsync();
            return recibo;
        }
    }
}
