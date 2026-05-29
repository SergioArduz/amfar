using AmfarAPI.Models.Enums;

namespace AmfarAPI.Models;

public class Usuario
{
    public int IdUsuario { get; set; }

    public int IdPersona { get; set; }

    public string Email { get; set; } = string.Empty;

    public string ContrasenaHash { get; set; } = string.Empty;

    public Rol Rol { get; set; }


    // Navigation Property
    public Persona Persona { get; set; } = null!;
}