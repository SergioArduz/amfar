namespace AmfarAPI.Models;

public class Estudiante
{
    public int IdPersona { get; set; }

    public bool TieneInstrumento { get; set; }


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