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
            Rol = u.Rol
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
            Rol = usuario.Rol
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

        usuario.Rol = dto.Rol;


        await _repository.UpdateAsync(usuario);
    }

    public async Task DeleteAsync(int id)
    {
        await _repository.DeleteAsync(id);
    }
}