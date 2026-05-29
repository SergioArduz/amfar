namespace AmfarAPI.Models;

public class EstudianteTutor
{
    public int IdEstudiante { get; set; }

    public int IdTutor { get; set; }


    // ========================================
    // RELACIONES
    // ========================================

    public Estudiante Estudiante { get; set; } = null!;

    public Tutor Tutor { get; set; } = null!;
}