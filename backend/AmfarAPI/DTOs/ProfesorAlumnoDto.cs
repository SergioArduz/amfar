namespace AmfarAPI.DTOs;

public class ProfesorAlumnoDto
{
    public string Alumno { get; set; } = string.Empty;

    public string Instrumento { get; set; } = string.Empty;

    public DateTime Fecha { get; set; }

    public string HoraInicio { get; set; } = string.Empty;

    public string HoraFin { get; set; } = string.Empty;
}