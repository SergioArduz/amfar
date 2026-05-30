using AmfarAPI.DTOs;
using AmfarAPI.Interfaces;
using AmfarAPI.Models;

namespace AmfarAPI.Services
{
    public class DescuentoService
    {
        private readonly IDescuentoRepository _descuentoRepository;

        public DescuentoService(IDescuentoRepository descuentoRepository)
        {
            _descuentoRepository = descuentoRepository;
        }

        public async Task<List<DescuentoDTO>> ObtenerTodos()
        {
            var descuentos = await _descuentoRepository.ObtenerTodos();

            return descuentos.Select(d => new DescuentoDTO
            {
                Codigo = d.Codigo,
                NombreDescuento = d.NombreDescuento,
                Porcentaje = d.Porcentaje,
                Descripcion = d.Descripcion
            }).ToList();
        }

        public async Task<List<DescuentoDTO>> ObtenerActivos()
        {
            var descuentos = await _descuentoRepository.ObtenerActivos();

            return descuentos.Select(d => new DescuentoDTO
            {
                Codigo = d.Codigo,
                NombreDescuento = d.NombreDescuento,
                Porcentaje = d.Porcentaje,
                Descripcion = d.Descripcion
            }).ToList();
        }

        public async Task<DescuentoDTO> ObtenerPorCodigo(string codigo)
        {
            var descuento = await _descuentoRepository.ObtenerPorCodigo(codigo);

            if (descuento == null)
                return null;

            return new DescuentoDTO
            {
                Codigo = descuento.Codigo,
                NombreDescuento = descuento.NombreDescuento,
                Porcentaje = descuento.Porcentaje,
                Descripcion = descuento.Descripcion
            };
        }

        public async Task<DescuentoDTO> Crear(DescuentoDTO dto)
        {
            var descuento = new Descuento
            {
                Codigo = dto.Codigo,
                NombreDescuento = dto.NombreDescuento,
                Porcentaje = dto.Porcentaje,
                Descripcion = dto.Descripcion,
                Estado = "Activo"
            };

            var creado = await _descuentoRepository.Crear(descuento);

            return new DescuentoDTO
            {
                Codigo = creado.Codigo,
                NombreDescuento = creado.NombreDescuento,
                Porcentaje = creado.Porcentaje,
                Descripcion = creado.Descripcion
            };
        }

        public async Task<DescuentoDTO> Actualizar(string codigo, DescuentoDTO dto)
        {
            var descuento = await _descuentoRepository.ObtenerPorCodigo(codigo);

            if (descuento == null)
                return null;

            descuento.NombreDescuento = dto.NombreDescuento;
            descuento.Porcentaje = dto.Porcentaje;
            descuento.Descripcion = dto.Descripcion;

            var actualizado = await _descuentoRepository.Actualizar(descuento);

            return new DescuentoDTO
            {
                Codigo = actualizado.Codigo,
                NombreDescuento = actualizado.NombreDescuento,
                Porcentaje = actualizado.Porcentaje,
                Descripcion = actualizado.Descripcion
            };
        }

        public async Task<bool> Desactivar(string codigo)
        {
            return await _descuentoRepository.Desactivar(codigo);
        }
    }
}