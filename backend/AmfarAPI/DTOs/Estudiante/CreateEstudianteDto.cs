namespace AmfarAPI.DTOs.Estudiante;

public class CreateEstudianteDto
{
    // ========================================
    // DATOS PERSONA
    // ========================================

    public string Nombre { get; set; } = string.Empty;

    public string Apellido { get; set; } = string.Empty;

    public string Telefono { get; set; } = string.Empty;


    // ========================================
    // DATOS ESTUDIANTE
    // ========================================

    public bool TieneInstrumento { get; set; }


    // ========================================
    // TUTORES OPCIONALES
    // ========================================

    public List<int>? IdsTutores { get; set; }
}