namespace AmfarAPI.DTOs
{
    public class CalendarioClaseDTO
    {
        public string CodigoInscripcion { get; set; } = string.Empty;
        public string DiaSemana { get; set; } = string.Empty;
        public string HoraInicio { get; set; } = string.Empty;
        public string HoraFin { get; set; } = string.Empty;
        public string CodigoProfesor { get; set; } = string.Empty;
        public string? CodigoInstrumento { get; set; }
        public bool InstrumentoPrestado { get; set; }
        public string Estado { get; set; } = string.Empty;
    }
}
