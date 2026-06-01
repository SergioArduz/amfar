using AmfarAPI.Data;
using AmfarAPI.Interfaces;
using AmfarAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AmfarAPI.Repositories
{
    public class InscripcionRepository : IInscripcionRepository
    {
        private readonly AppDbContext _context;

        public InscripcionRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Inscripcion>> ObtenerTodas()
        {
            return await _context.Inscripciones
                .Include(i => i.InscripcionClases)
                .ToListAsync();
        }

        public async Task<List<Inscripcion>> ObtenerActivas()
        {
            return await _context.Inscripciones
                .Include(i => i.InscripcionClases)
                .Where(i => i.Estado == "Activo")
                .ToListAsync();
        }

        public async Task<Inscripcion?> ObtenerPorCodigo(string codigo)
        {
            return await _context.Inscripciones
                .Include(i => i.InscripcionClases)
                .FirstOrDefaultAsync(i => i.Codigo == codigo);
        }

        public async Task<Inscripcion> Crear(Inscripcion inscripcion)
        {
            _context.Inscripciones.Add(inscripcion);
            await _context.SaveChangesAsync();
            return inscripcion;
        }

        public async Task<Inscripcion> Actualizar(Inscripcion inscripcion)
        {
            _context.Inscripciones.Update(inscripcion);
            await _context.SaveChangesAsync();
            return inscripcion;
        }

        public async Task<bool> Desactivar(string codigo)
        {
            var inscripcion = await ObtenerPorCodigo(codigo);

            if (inscripcion == null)
                return false;

            inscripcion.Estado = "Inactivo";

            foreach (var clase in inscripcion.InscripcionClases)
            {
                clase.Estado = "Inactivo";
            }

            await _context.SaveChangesAsync();
            return true;
        }
    }
}