namespace AmfarAPI.DTOs
{
    public class PagoDTO
    {
        public string Codigo { get; set; } = string.Empty;

        public string CodigoInscripcion { get; set; } = string.Empty;

        public DateTime FechaVencimiento { get; set; }

        public DateTime? FechaPago { get; set; }

        public decimal Monto { get; set; }

        public string MetodoPago { get; set; } = string.Empty;

        public string EstadoPago { get; set; } = "Pendiente";
    }
}