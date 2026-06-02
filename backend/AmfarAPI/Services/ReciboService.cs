using AmfarAPI.Data;
using AmfarAPI.DTOs;
using AmfarAPI.Interfaces;
using AmfarAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AmfarAPI.Services
{
    public class ReciboService : IReciboService
    {
        private readonly IReciboRepository _reciboRepository;
        private readonly AppDbContext _context;

        public ReciboService(IReciboRepository reciboRepository, AppDbContext context)
        {
            _reciboRepository = reciboRepository;
            _context = context;
        }

        public async Task<List<ReciboDTO>> ObtenerTodos()
        {
            var recibos = await _reciboRepository.ObtenerTodos();
            return recibos.Select(MapearDTO).ToList();
        }

        public async Task<ReciboDTO?> ObtenerPorNumero(string numeroRecibo)
        {
            var recibo = await _reciboRepository.ObtenerPorNumero(numeroRecibo);
            return recibo == null ? null : MapearDTO(recibo);
        }

        public async Task<List<ReciboDTO>> ObtenerPorPago(string codigoPago)
        {
            var recibos = await _reciboRepository.ObtenerPorPago(codigoPago);
            return recibos.Select(MapearDTO).ToList();
        }

        public async Task<ReciboDTO?> Generar(string codigoPago, string emitidoPor)
        {
            var pago = await _context.Pagos
                .FirstOrDefaultAsync(p => p.Codigo == codigoPago && p.Estado == "Activo");

            if (pago == null)
                return null;

            if (pago.EstadoPago != "Pagado")
                return null;

            var yaExiste = await _reciboRepository.ObtenerPorPago(codigoPago);
            if (yaExiste.Any(r => r.Estado == "Activo"))
                return null;

            var inscripcion = await _context.Inscripciones
                .FirstOrDefaultAsync(i => i.Codigo == pago.CodigoInscripcion);

            if (inscripcion == null)
                return null;

            var plan = await _context.Planes
                .FirstOrDefaultAsync(p => p.Codigo == inscripcion.CodigoPlan);

            string datosAlumno = $"Código: {inscripcion.CodigoEstudiante}";

            var ultimoRecibo = await _context.Recibos
                .OrderByDescending(r => r.IdRecibo)
                .FirstOrDefaultAsync();

            int siguienteNumero = (ultimoRecibo?.IdRecibo ?? 0) + 1;
            string numeroRecibo = $"REC-{siguienteNumero:D5}";

            var periodo = pago.FechaVencimiento.ToString("MMMM yyyy");

            var recibo = new Recibo
            {
                NumeroRecibo = numeroRecibo,
                CodigoPago = codigoPago,
                FechaEmision = DateTime.UtcNow,
                Monto = pago.Monto,
                DatosAlumno = datosAlumno,
                NombrePlan = plan?.NombrePlan ?? "Sin plan",
                Periodo = periodo,
                EmitidoPor = emitidoPor,
                Estado = "Activo"
            };

            var creado = await _reciboRepository.Crear(recibo);
            return MapearDTO(creado);
        }

        private static ReciboDTO MapearDTO(Recibo recibo)
        {
            return new ReciboDTO
            {
                IdRecibo = recibo.IdRecibo,
                NumeroRecibo = recibo.NumeroRecibo,
                CodigoPago = recibo.CodigoPago,
                FechaEmision = recibo.FechaEmision,
                Monto = recibo.Monto,
                DatosAlumno = recibo.DatosAlumno,
                NombrePlan = recibo.NombrePlan,
                Periodo = recibo.Periodo,
                EmitidoPor = recibo.EmitidoPor
            };
        }
    }
}
