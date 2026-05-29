namespace AmfarAPI.DTOs.Tutor;

public class TutorDto
{
    public int IdPersona { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public string Apellido { get; set; } = string.Empty;

    public string Telefono { get; set; } = string.Empty;

    public string? Parentesco { get; set; }
}