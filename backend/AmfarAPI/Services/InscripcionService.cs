using AmfarAPI.Data;
using AmfarAPI.DTOs;
using AmfarAPI.Interfaces;
using AmfarAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AmfarAPI.Services
{
    public class InscripcionService : IInscripcionService
    {
        private readonly IInscripcionRepository _inscripcionRepository;
        private readonly AppDbContext _context;

        public InscripcionService(IInscripcionRepository inscripcionRepository, AppDbContext context)
        {
            _inscripcionRepository = inscripcionRepository;
            _context = context;
        }

        public async Task<List<InscripcionDTO>> ObtenerTodas()
        {
            var inscripciones = await _inscripcionRepository.ObtenerTodas();
            return inscripciones.Select(i => MapearDTO(i)).ToList();
        }

        public async Task<List<InscripcionDTO>> ObtenerActivas()
        {
            var inscripciones = await _inscripcionRepository.ObtenerActivas();
            return inscripciones.Select(i => MapearDTO(i)).ToList();
        }

        public async Task<InscripcionDTO?> ObtenerPorCodigo(string codigo)
        {
            var inscripcion = await _inscripcionRepository.ObtenerPorCodigo(codigo);

            if (inscripcion == null)
                return null;

            return MapearDTO(inscripcion);
        }

        public async Task<InscripcionDTO?> Crear(InscripcionDTO dto)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
            var plan = await _context.Planes
                .FirstOrDefaultAsync(p => p.Codigo == dto.CodigoPlan && p.Estado == "Activo");

            if (plan == null)
                return null;

            Descuento? descuento = null;

            if (!string.IsNullOrEmpty(dto.CodigoDescuento))
            {
                descuento = await _context.Descuentos
                    .FirstOrDefaultAsync(d => d.Codigo == dto.CodigoDescuento && d.Estado == "Activo");

                if (descuento == null)
                    return null;
            }

            decimal montoFinal = plan.Monto;

            if (descuento != null)
            {
                montoFinal = plan.Monto - (plan.Monto * descuento.Porcentaje / 100);
            }

            var clasesNuevas = dto.Clases.ToList();

            if (clasesNuevas.Count == 0)
                return null;

            var profesoresDb = await _context.Profesores
                .ToListAsync();

            var clasesActivas = await _context.InscripcionClases
                .Where(c => c.Estado == "Activo")
                .ToListAsync();

            foreach (var clase in clasesNuevas)
            {
                if (!int.TryParse(clase.CodigoProfesor, out var idProfesor))
                    return null;

                var profesor = profesoresDb.FirstOrDefault(p => p.IdProfesor == idProfesor);

                if (profesor == null || profesor.Estado != "Activo")
                    return null;

                var conflictoProfesor = clasesActivas.Any(c =>
                    c.CodigoProfesor == clase.CodigoProfesor &&
                    c.DiaSemana == clase.DiaSemana &&
                    clase.HoraInicio < c.HoraFin &&
                    clase.HoraFin > c.HoraInicio
                );

                if (conflictoProfesor)
                    return null;

                if (clase.InstrumentoPrestado && !string.IsNullOrEmpty(clase.CodigoInstrumento))
                {
                    var conflictoInstrumento = clasesActivas.Any(c =>
                        c.CodigoInstrumento == clase.CodigoInstrumento &&
                        c.InstrumentoPrestado &&
                        c.DiaSemana == clase.DiaSemana &&
                        clase.HoraInicio < c.HoraFin &&
                        clase.HoraFin > c.HoraInicio
                    );

                    if (conflictoInstrumento)
                        return null;
                }
            }

            var inscripcion = new Inscripcion
            {
                Codigo = dto.Codigo,
                FechaInicio = dto.FechaInicio,
                FechaFin = dto.FechaFin,
                Modalidad = dto.Modalidad,
                CodigoEstudiante = dto.CodigoEstudiante,
                CodigoPlan = dto.CodigoPlan,
                CodigoDescuento = dto.CodigoDescuento,
                MontoFinal = montoFinal,
                EstadoPago = "Pendiente",
                Estado = "Activo",
                InscripcionClases = dto.Clases.Select(c => new InscripcionClase
                {
                    Codigo = $"{dto.Codigo}-{c.DiaSemana}-{c.HoraInicio}",
                    CodigoProfesor = c.CodigoProfesor,
                    CodigoInstrumento = c.CodigoInstrumento,
                    InstrumentoPrestado = c.InstrumentoPrestado,
                    DiaSemana = c.DiaSemana,
                    HoraInicio = c.HoraInicio,
                    HoraFin = c.HoraFin,
                    Estado = "Activo"
                }).ToList()
            };

            var creado = await _inscripcionRepository.Crear(inscripcion);

            var pago = new Pago
            {
                Codigo = $"PAG-{dto.Codigo}",
                CodigoInscripcion = dto.Codigo,
                FechaGeneracion = DateTime.UtcNow,
                FechaVencimiento = DateTime.UtcNow.AddMonths(1),
                Monto = montoFinal,
                MetodoPago = "Pendiente",
                EstadoPago = "Pendiente",
                Estado = "Activo"
            };

            _context.Pagos.Add(pago);
            await _context.SaveChangesAsync();

            await transaction.CommitAsync();

            return MapearDTO(creado);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<bool> Desactivar(string codigo)
        {
            var inscripcion = await _context.Inscripciones
                .FirstOrDefaultAsync(i => i.Codigo == codigo);

            if (inscripcion == null)
                return false;

            var prestamosActivos = await _context.PrestamosInstrumentos
                .Where(p => p.IdInscripcion == inscripcion.IdInscripcion
                         && p.Estado == "Activo"
                         && !p.EsPropio)
                .ToListAsync();

            foreach (var prestamo in prestamosActivos)
            {
                prestamo.Estado = "Devuelto";
                prestamo.FechaFin = DateTime.UtcNow;

                var instrumento = await _context.Instrumentos
                    .FirstOrDefaultAsync(i => i.IdInstrumento == prestamo.IdInstrumento);

                if (instrumento != null)
                {
                    instrumento.StockDisponible++;
                }
            }

            return await _inscripcionRepository.Desactivar(codigo);
        }

        private InscripcionDTO MapearDTO(Inscripcion inscripcion)
        {
            return new InscripcionDTO
            {
                Codigo = inscripcion.Codigo,
                FechaInicio = inscripcion.FechaInicio,
                FechaFin = inscripcion.FechaFin,
                Modalidad = inscripcion.Modalidad,
                CodigoEstudiante = inscripcion.CodigoEstudiante,
                CodigoPlan = inscripcion.CodigoPlan,
                CodigoDescuento = inscripcion.CodigoDescuento,
                Clases = inscripcion.InscripcionClases.Select(c => new ClaseInscripcionDTO
                {
                    CodigoProfesor = c.CodigoProfesor,
                    CodigoInstrumento = c.CodigoInstrumento,
                    InstrumentoPrestado = c.InstrumentoPrestado,
                    DiaSemana = c.DiaSemana,
                    HoraInicio = c.HoraInicio,
                    HoraFin = c.HoraFin
                }).ToList()
            };
        }
    }
}
