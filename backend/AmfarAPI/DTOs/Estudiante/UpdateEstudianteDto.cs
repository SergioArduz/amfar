namespace AmfarAPI.DTOs.Estudiante;

public class UpdateEstudianteDto
{
    // ========================================
    // PERSONA
    // ========================================

    public string Nombre { get; set; } = string.Empty;

    public string Apellido { get; set; } = string.Empty;

    public string Telefono { get; set; } = string.Empty;


    // ========================================
    // ESTUDIANTE
    // ========================================

    public bool TieneInstrumento { get; set; }


    // ========================================
    // TUTORES
    // ========================================

    public List<int>? IdsTutores { get; set; }
}