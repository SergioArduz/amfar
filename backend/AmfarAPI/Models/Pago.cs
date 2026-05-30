using System.ComponentModel.DataAnnotations;

namespace AmfarAPI.Models
{
    public class Pago
    {
        [Key]
        public int IdPago { get; set; }

        public string Codigo { get; set; } = string.Empty;

        public string CodigoInscripcion { get; set; } = string.Empty;

        public DateTime FechaGeneracion { get; set; }

        public DateTime FechaVencimiento { get; set; }

        public DateTime? FechaPago { get; set; }

        public decimal Monto { get; set; }

        public string MetodoPago { get; set; } = string.Empty;

        public string EstadoPago { get; set; } = "Pendiente";

        public string Estado { get; set; } = "Activo";
    }
}