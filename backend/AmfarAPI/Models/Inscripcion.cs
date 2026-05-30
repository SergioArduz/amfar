using System.ComponentModel.DataAnnotations;

namespace AmfarAPI.Models
{
    public class Inscripcion
    {
        [Key]
        public int IdInscripcion { get; set; }

        public string Codigo { get; set; } = string.Empty;
        public DateTime FechaInicio { get; set; }
        public DateTime? FechaFin { get; set; }
        public string Modalidad { get; set; } = string.Empty;
        public decimal MontoFinal { get; set; }
        public string EstadoPago { get; set; } = "Pendiente";
        public string Estado { get; set; } = "Activo";

        public string CodigoEstudiante { get; set; } = string.Empty;
        public string CodigoPlan { get; set; } = string.Empty;
        public string? CodigoDescuento { get; set; }

        public ICollection<InscripcionClase> InscripcionClases { get; set; } = new List<InscripcionClase>();
    }
}