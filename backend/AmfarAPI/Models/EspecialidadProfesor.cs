namespace AmfarAPI.Models;

public class EspecialidadProfesor
{
    public int IdProfesor { get; set; }
    public Profesor Profesor { get; set; } = null!;
    public int IdInstrumento { get; set; }
    public Instrumento Instrumento { get; set; } = null!;
}
