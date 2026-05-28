namespace AmfarAPI.Models;

public class Profesor
{
    public int IdProfesor { get; set; }
    public int IdPersona { get; set; }
    public Persona Persona { get; set; } = null!;
    public string Estado { get; set; } = "Activo";
    public DateTime FechaRegistro { get; set; }

    public ICollection<EspecialidadProfesor> Especialidades { get; set; } = new List<EspecialidadProfesor>();
}
