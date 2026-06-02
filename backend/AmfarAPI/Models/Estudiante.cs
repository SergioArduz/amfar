namespace AmfarAPI.Models;

public class Estudiante
{
    public int IdPersona { get; set; }

    public bool TieneInstrumento { get; set; }

    public string Estado { get; set; } = "Activo";


    // RELACION
    public Persona Persona { get; set; } = null!;

    public ICollection<EstudianteTutor> EstudiantesTutores
        = new List<EstudianteTutor>();
}