namespace AmfarAPI.Models;

public class Tutor
{
    public int IdPersona { get; set; }

    public string Parentesco { get; set; } = string.Empty;

    public string Estado { get; set; } = "Activo";


    // RELACION
    public Persona Persona { get; set; } = null!;

    public ICollection<EstudianteTutor> EstudiantesTutores
        = new List<EstudianteTutor>();
}