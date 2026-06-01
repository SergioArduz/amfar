using System.ComponentModel.DataAnnotations;

namespace AmfarAPI.Models;

public class Clase
{
    [Key]
    public int IdClase { get; set; }

    public DateTime Fecha { get; set; }

    public TimeSpan HoraInicio { get; set; }

    public TimeSpan HoraFin { get; set; }

    public string Aula { get; set; } = string.Empty;

    public int ProfesorId { get; set; }

    public int EstudianteId { get; set; }

    public int InstrumentoId { get; set; }
}