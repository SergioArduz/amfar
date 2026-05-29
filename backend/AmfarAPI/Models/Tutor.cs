namespace AmfarAPI.Models;

public class Tutor
{
    public int IdPersona { get; set; }

    public string Parentesco { get; set; } = string.Empty;


    // ========================================
    // RELACION
    // ========================================

    public Persona Persona { get; set; } = null!;


    // ========================================
    // N:M
    // ========================================

    public ICollection<EstudianteTutor> EstudiantesTutores
        { get; set; } = new List<EstudianteTutor>();
}
