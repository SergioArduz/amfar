namespace AmfarAPI.Models;

public class Estudiante
{
    public int IdPersona { get; set; }

    public bool TieneInstrumento { get; set; }


    // RELACION
    public Persona Persona { get; set; } = null!;

    public ICollection<EstudianteTutor> EstudiantesTutores
        = new List<EstudianteTutor>();
}