using AmfarAPI.DTOs;
using AmfarAPI.Interfaces;
using AmfarAPI.Models;

namespace AmfarAPI.Services
{
    public class PagoService : IPagoService
    {
        private readonly IPagoRepository _pagoRepository;

        public PagoService(IPagoRepository pagoRepository)
        {
            _pagoRepository = pagoRepository;
        }

        public async Task<List<PagoDTO>> ObtenerTodos()
        {
            var pagos = await _pagoRepository.ObtenerTodos();
            return pagos.Select(p => MapearDTO(p)).ToList();
        }

        public async Task<List<PagoDTO>> ObtenerActivos()
        {
            var pagos = await _pagoRepository.ObtenerActivos();
            return pagos.Select(p => MapearDTO(p)).ToList();
        }

        public async Task<PagoDTO?> ObtenerPorCodigo(string codigo)
        {
            var pago = await _pagoRepository.ObtenerPorCodigo(codigo);

            if (pago == null)
                return null;

            return MapearDTO(pago);
        }

        public async Task<List<PagoDTO>> ObtenerPorInscripcion(string codigoInscripcion)
        {
            var pagos = await _pagoRepository.ObtenerPorInscripcion(codigoInscripcion);
            return pagos.Select(p => MapearDTO(p)).ToList();
        }

        public async Task<PagoDTO> Crear(PagoDTO dto)
        {
            var codigo = string.IsNullOrWhiteSpace(dto.Codigo)
                ? $"PAG-{DateTime.Now:yyyyMMdd-HHmmss}-{Guid.NewGuid().ToString("N")[..4].ToUpper()}"
                : dto.Codigo;

            var pago = new Pago
            {
                Codigo = codigo,
                CodigoInscripcion = dto.CodigoInscripcion,
                FechaGeneracion = DateTime.UtcNow,
                FechaVencimiento = dto.FechaVencimiento,
                FechaPago = dto.FechaPago,
                Monto = dto.Monto,
                MetodoPago = dto.MetodoPago,
                EstadoPago = "Pendiente",
                Estado = "Activo"
            };

            var creado = await _pagoRepository.Crear(pago);
            return MapearDTO(creado);
        }

        public async Task<PagoDTO?> ActualizarEstadoPago(string codigo, string estadoPago, string metodoPago)
        {
            var pago = await _pagoRepository.ObtenerPorCodigo(codigo);

            if (pago == null)
                return null;

            pago.EstadoPago = estadoPago;
            pago.MetodoPago = metodoPago;

            if (estadoPago == "Pagado")
            {
                pago.FechaPago = DateTime.UtcNow;
            }

            var actualizado = await _pagoRepository.Actualizar(pago);
            return MapearDTO(actualizado);
        }

        public async Task<bool> Desactivar(string codigo)
        {
            return await _pagoRepository.Desactivar(codigo);
        }

        private PagoDTO MapearDTO(Pago pago)
        {
            return new PagoDTO
            {
                Codigo = pago.Codigo,
                CodigoInscripcion = pago.CodigoInscripcion,
                FechaVencimiento = pago.FechaVencimiento,
                FechaPago = pago.FechaPago,
                Monto = pago.Monto,
                MetodoPago = pago.MetodoPago,
                EstadoPago = pago.EstadoPago
            };
        }
    }
}