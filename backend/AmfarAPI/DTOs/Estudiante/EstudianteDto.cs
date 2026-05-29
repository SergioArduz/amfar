namespace AmfarAPI.DTOs.Estudiante;

public class EstudianteDto
{
    public int IdPersona { get; set; }

    public bool TieneInstrumento { get; set; }

    // DATOS PERSONA
    public string Nombre { get; set; } = string.Empty;

    public string Apellido { get; set; } = string.Empty;

    public string Telefono { get; set; } = string.Empty;


    // TUTORES
    public List<TutorSimpleDto> Tutores { get; set; }
        = new();
}