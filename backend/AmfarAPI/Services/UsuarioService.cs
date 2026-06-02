using AmfarAPI.Data.Repositories;
using AmfarAPI.DTOs.Usuario;
using AmfarAPI.Interfaces;
using AmfarAPI.Models;

namespace AmfarAPI.Services;

public class UsuarioService : IUsuarioService
{
    private readonly UsuarioRepository _repository;

    public UsuarioService(UsuarioRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<UsuarioDto>> GetAllAsync()
    {
        var usuarios = await _repository.GetAllAsync();

        return usuarios.Select(u => new UsuarioDto
        {
            IdUsuario = u.IdUsuario,
            IdPersona = u.IdPersona,

            Nombre = u.Persona.Nombre,
            Apellido = u.Persona.Apellido,
            Telefono = u.Persona.Telefono,

            Email = u.Email,
            Rol = u.Rol,
            Estado = u.Estado
        });

    }

    public async Task<UsuarioDto?> GetByIdAsync(int id)
    {
        var usuario = await _repository.GetByIdAsync(id);

        if (usuario == null)
            return null;

        return new UsuarioDto
        {
            IdUsuario = usuario.IdUsuario,
            IdPersona = usuario.IdPersona,

            Nombre = usuario.Persona.Nombre,
            Apellido = usuario.Persona.Apellido,
            Telefono = usuario.Persona.Telefono,

            Email = usuario.Email,
            Rol = usuario.Rol,
            Estado = usuario.Estado
        };
    }

    public async Task CreateAsync(CreateUsuarioDto dto)
    {
        var existeEmail =
            await _repository.GetByEmailAsync(dto.Email);

        if (existeEmail != null)
            throw new Exception("El email ya está registrado");


        // ========================================
        // CREAR PERSONA
        // ========================================

        var persona = new Persona
        {
            Nombre = dto.Nombre,
            Apellido = dto.Apellido,
            Telefono = dto.Telefono
        };


        // ========================================
        // HASH PASSWORD
        // ========================================

        var passwordHash =
            BCrypt.Net.BCrypt.HashPassword(dto.Contrasena);


        // ========================================
        // CREAR USUARIO
        // ========================================

        var usuario = new Usuario
        {
            Persona = persona,

            Email = dto.Email,

            ContrasenaHash = passwordHash,

            Rol = dto.Rol
        };

        await _repository.AddAsync(usuario);
    }

    public async Task UpdateAsync(int id, UpdateUsuarioDto dto)
    {
        var usuario = await _repository.GetByIdAsync(id);

        if (usuario == null)
            throw new Exception("Usuario no encontrado");


        // ========================================
        // VALIDAR EMAIL
        // ========================================

        var emailExistente =
            await _repository.GetByEmailAsync(dto.Email);

        if (emailExistente != null &&
            emailExistente.IdUsuario != id)
        {
            throw new Exception("El email ya está registrado");
        }


        // ========================================
        // ACTUALIZAR PERSONA
        // ========================================

        usuario.Persona.Nombre = dto.Nombre;

        usuario.Persona.Apellido = dto.Apellido;

        usuario.Persona.Telefono = dto.Telefono;


        // ========================================
        // ACTUALIZAR USUARIO
        // ========================================

        usuario.Email = dto.Email;

        if (usuario.Rol == Models.Enums.Rol.Administrador && dto.Rol != Models.Enums.Rol.Administrador)
        {
            var adminsActivos = (await _repository.GetAllAsync())
                .Count(u => u.Rol == Models.Enums.Rol.Administrador && u.Estado == "Activo");

            if (adminsActivos <= 1)
                throw new Exception("No se puede cambiar el rol del último administrador activo");
        }

        usuario.Rol = dto.Rol;


        await _repository.UpdateAsync(usuario);
    }

    public async Task ToggleEstadoAsync(int id)
    {
        var usuario = await _repository.GetByIdAsync(id);

        if (usuario == null)
            throw new Exception("Usuario no encontrado");

        if (usuario.Rol == Models.Enums.Rol.Administrador && usuario.Estado == "Activo")
        {
            var adminsActivos = (await _repository.GetAllAsync())
                .Count(u => u.Rol == Models.Enums.Rol.Administrador && u.Estado == "Activo");

            if (adminsActivos <= 1)
                throw new Exception("No se puede desactivar el último administrador activo");
        }

        usuario.Estado = usuario.Estado == "Activo" ? "Inactivo" : "Activo";

        await _repository.UpdateAsync(usuario);
    }

    public async Task DeleteAsync(int id)
    {
        var usuario = await _repository.GetByIdAsync(id);

        if (usuario == null)
            throw new Exception("Usuario no encontrado");

        if (usuario.Rol == Models.Enums.Rol.Administrador)
        {
            var adminsActivos = (await _repository.GetAllAsync())
                .Count(u => u.Rol == Models.Enums.Rol.Administrador && u.Estado == "Activo");

            if (adminsActivos <= 1)
                throw new Exception("No se puede eliminar el último administrador activo");
        }

        await _repository.DeleteAsync(id);
    }
}