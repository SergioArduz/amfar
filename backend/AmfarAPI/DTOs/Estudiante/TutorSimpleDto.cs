namespace AmfarAPI.DTOs.Estudiante;

public class TutorSimpleDto
{
    public int IdTutor { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public string Apellido { get; set; } = string.Empty;

    public string Parentesco { get; set; } = string.Empty;
}