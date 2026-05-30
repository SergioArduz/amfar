using System.ComponentModel.DataAnnotations;

namespace AmfarAPI.Models
{
    public class InscripcionClase
    {
        [Key]
        public int IdInscripcionClase { get; set; }

        public string Codigo { get; set; } = string.Empty;
        public int IdInscripcion { get; set; }

        public string CodigoProfesor { get; set; } = string.Empty;
        public string? CodigoInstrumento { get; set; }

        public bool InstrumentoPrestado { get; set; }
        public string DiaSemana { get; set; } = string.Empty;
        public TimeSpan HoraInicio { get; set; }
        public TimeSpan HoraFin { get; set; }

        public string Estado { get; set; } = "Activo";

        public Inscripcion Inscripcion { get; set; } = null!;
    }
}