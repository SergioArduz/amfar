using AmfarAPI.Models.Enums;

namespace AmfarAPI.DTOs.Usuario;

public class CreateUsuarioDto
{
    // PERSONA
    public string Nombre { get; set; } = string.Empty;

    public string Apellido { get; set; } = string.Empty;

    public string Telefono { get; set; } = string.Empty;

    // USUARIO
    public string Email { get; set; } = string.Empty;

    public string Contrasena { get; set; } = string.Empty;

    public Rol Rol { get; set; }
}