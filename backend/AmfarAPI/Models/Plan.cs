using System.ComponentModel.DataAnnotations;

namespace AmfarAPI.Models
{
    public class Plan
    {
        [Key]
        public int Id_Plan { get; set; }

        public string Codigo { get; set; }

        public string NombrePlan { get; set; }

        public decimal Monto { get; set; }

        public int HorasSemanales { get; set; }

        public int HorasMensuales { get; set; }

        public bool EsIndividual { get; set; }

        public string Estado { get; set; } = "Activo";

    }
}