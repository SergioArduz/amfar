using AmfarAPI.Models;

namespace AmfarAPI.Interfaces
{
    public interface IInscripcionRepository
    {
        Task<List<Inscripcion>> ObtenerTodas();
        Task<List<Inscripcion>> ObtenerActivas();
        Task<Inscripcion?> ObtenerPorCodigo(string codigo);
        Task<Inscripcion> Crear(Inscripcion inscripcion);
        Task<Inscripcion> Actualizar(Inscripcion inscripcion);
        Task<bool> Desactivar(string codigo);
    }
}