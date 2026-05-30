namespace AmfarAPI.DTOs
{
    public class ClaseInscripcionDTO
    {
        public string CodigoProfesor { get; set; } = string.Empty;
        public string? CodigoInstrumento { get; set; }
        public bool InstrumentoPrestado { get; set; }
        public string DiaSemana { get; set; } = string.Empty;
        public TimeSpan HoraInicio { get; set; }
        public TimeSpan HoraFin { get; set; }
    }
}