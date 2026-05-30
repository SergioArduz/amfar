namespace AmfarAPI.DTOs
{
    public class InscripcionDTO
    {
        public string Codigo { get; set; } = string.Empty;
        public DateTime FechaInicio { get; set; }
        public DateTime? FechaFin { get; set; }
        public string Modalidad { get; set; } = string.Empty;

        public string CodigoEstudiante { get; set; } = string.Empty;
        public string CodigoPlan { get; set; } = string.Empty;
        public string? CodigoDescuento { get; set; }

        public List<ClaseInscripcionDTO> Clases { get; set; } = new List<ClaseInscripcionDTO>();
    }
}