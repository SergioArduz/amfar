using AmfarAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AmfarAPI.Data.Repositories;

public class UsuarioRepository
{
    private readonly AppDbContext _context;

    public UsuarioRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Usuario>> GetAllAsync()
    {
        return await _context.Usuarios
            .Where(u => u.Estado == "Activo")
            .Include(u => u.Persona)
            .ToListAsync();
    }

    public async Task<Usuario?> GetByIdAsync(int id)
    {
        return await _context.Usuarios
            .Include(u => u.Persona)
            .FirstOrDefaultAsync(u => u.IdUsuario == id && u.Estado == "Activo");
    }

    public async Task<Usuario?> GetByEmailAsync(string email)
    {
        return await _context.Usuarios
            .Include(u => u.Persona)
            .FirstOrDefaultAsync(u => u.Email == email && u.Estado == "Activo");
    }

    public async Task AddAsync(Usuario usuario)
    {
        await _context.Usuarios.AddAsync(usuario);

        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Usuario usuario)
    {
        _context.Usuarios.Update(usuario);

        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var usuario = await _context.Usuarios.FindAsync(id);

        if (usuario != null)
        {
            usuario.Estado = "Inactivo";

            await _context.SaveChangesAsync();
        }
    }
}