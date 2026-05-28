namespace AmfarAPI.DTOs.Persona;

public class PersonaDto
{
    public int IdPersona { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public string Apellido { get; set; } = string.Empty;

    public string Telefono { get; set; } = string.Empty;
}