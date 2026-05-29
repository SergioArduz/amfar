using AmfarAPI.Data.Repositories;
using AmfarAPI.DTOs.Auth;
using AmfarAPI.Interfaces;
using AmfarAPI.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AmfarAPI.Services;

public class AuthService : IAuthService
{
    private readonly UsuarioRepository _usuarioRepository;

    private readonly IConfiguration _configuration;

    public AuthService(
        UsuarioRepository usuarioRepository,
        IConfiguration configuration
    )
    {
        _usuarioRepository = usuarioRepository;

        _configuration = configuration;
    }


    public async Task<AuthResponseDto?> LoginAsync(LoginDto dto)
    {
        // ========================================
        // BUSCAR USUARIO
        // ========================================

        var usuario =
            await _usuarioRepository.GetByEmailAsync(dto.Email);

        if (usuario == null)
            return null;


        // ========================================
        // VALIDAR PASSWORD
        // ========================================

        bool passwordCorrecta =
            BCrypt.Net.BCrypt.Verify(
                dto.Contrasena,
                usuario.ContrasenaHash
            );

        if (!passwordCorrecta)
            return null;


        // ========================================
        // CLAIMS
        // ========================================

        var claims = new List<Claim>
        {
            new Claim(
                ClaimTypes.NameIdentifier,
                usuario.IdUsuario.ToString()
            ),

            new Claim(
                ClaimTypes.Email,
                usuario.Email
            ),

            new Claim(
                ClaimTypes.Role,
                usuario.Rol.ToString()
            )
        };


        // ========================================
        // JWT SETTINGS
        // ========================================

        var jwtSettings =
            _configuration.GetSection("Jwt");

        var key =
            new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    jwtSettings["Key"]!
                )
            );

        var credentials =
            new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256
            );


        // ========================================
        // EXPIRACION
        // ========================================

        var expires =
            DateTime.UtcNow.AddMinutes(
                Convert.ToDouble(
                    jwtSettings["ExpiresInMinutes"]
                )
            );


        // ========================================
        // TOKEN
        // ========================================

        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],

            audience: jwtSettings["Audience"],

            claims: claims,

            expires: expires,

            signingCredentials: credentials
        );


        // ========================================
        // RESPUESTA
        // ========================================

        return new AuthResponseDto
        {
            Token =
                new JwtSecurityTokenHandler()
                    .WriteToken(token),

            Expiracion = expires,

            Nombre = usuario.Persona.Nombre,

            Apellido = usuario.Persona.Apellido,

            Email = usuario.Email,

            Rol = usuario.Rol.ToString()
        };
    }
}