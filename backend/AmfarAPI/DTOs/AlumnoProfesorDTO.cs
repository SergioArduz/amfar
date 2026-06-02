namespace AmfarAPI.DTOs
{
    public class AlumnoProfesorDTO
    {
        public string CodigoInscripcion { get; set; } = string.Empty;
        public string CodigoEstudiante { get; set; } = string.Empty;
        public string DiaSemana { get; set; } = string.Empty;
        public string HoraInicio { get; set; } = string.Empty;
        public string HoraFin { get; set; } = string.Empty;
        public string? CodigoInstrumento { get; set; }
        public bool InstrumentoPrestado { get; set; }
        public string Modalidad { get; set; } = string.Empty;
    }
}
