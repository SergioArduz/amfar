namespace AmfarAPI.DTOs;

public class ClaseDto
{
    public DateTime Fecha { get; set; }

    public string HoraInicio { get; set; } = string.Empty;

    public string HoraFin { get; set; } = string.Empty;

    public string Aula { get; set; } = string.Empty;
}