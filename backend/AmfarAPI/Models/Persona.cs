namespace AmfarAPI.Models;

public class Persona
{
    public int IdPersona { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public string Apellido { get; set; } = string.Empty;

    public string Telefono { get; set; } = string.Empty;


    // ========================================
    // RELACIONES 1:1
    // ========================================

    public Usuario? Usuario { get; set; }

    public Tutor? Tutor { get; set; }

    public Estudiante? Estudiante { get; set; }

    public Profesor? Profesor { get; set; }
}