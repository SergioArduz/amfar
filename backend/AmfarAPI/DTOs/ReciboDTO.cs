namespace AmfarAPI.DTOs
{
    public class ReciboDTO
    {
        public int IdRecibo { get; set; }
        public string NumeroRecibo { get; set; } = string.Empty;
        public string CodigoPago { get; set; } = string.Empty;
        public DateTime FechaEmision { get; set; }
        public decimal Monto { get; set; }
        public string DatosAlumno { get; set; } = string.Empty;
        public string NombrePlan { get; set; } = string.Empty;
        public string Periodo { get; set; } = string.Empty;
        public string EmitidoPor { get; set; } = string.Empty;
    }
}
