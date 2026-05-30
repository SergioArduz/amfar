using AmfarAPI.Data;
using AmfarAPI.DTOs;
using AmfarAPI.Interfaces;
using AmfarAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AmfarAPI.Services
{
    public class InscripcionService
    {
        private readonly IInscripcionRepository _inscripcionRepository;
        private readonly AmfarAPIContext _context;

        public InscripcionService(IInscripcionRepository inscripcionRepository, AmfarAPIContext context)
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

            foreach (var clase in dto.Clases)
            {
                bool conflictoProfesor = await _context.InscripcionClases.AnyAsync(c =>
                    c.CodigoProfesor == clase.CodigoProfesor &&
                    c.DiaSemana == clase.DiaSemana &&
                    c.Estado == "Activo" &&
                    clase.HoraInicio < c.HoraFin &&
                    clase.HoraFin > c.HoraInicio
                );

                if (conflictoProfesor)
                    return null;

                if (clase.InstrumentoPrestado && !string.IsNullOrEmpty(clase.CodigoInstrumento))
                {
                    bool conflictoInstrumento = await _context.InscripcionClases.AnyAsync(c =>
                        c.CodigoInstrumento == clase.CodigoInstrumento &&
                        c.InstrumentoPrestado == true &&
                        c.DiaSemana == clase.DiaSemana &&
                        c.Estado == "Activo" &&
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

            return MapearDTO(creado);
        }

        public async Task<bool> Desactivar(string codigo)
        {
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