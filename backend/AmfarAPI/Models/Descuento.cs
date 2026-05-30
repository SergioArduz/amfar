using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AmfarAPI.Models
{
    public class Descuento
    {
        [Key]
        public int Id_Descuento { get; set; }

        public string Codigo { get; set; }

        public string NombreDescuento { get; set; }

        public decimal Porcentaje { get; set; }

        public string Descripcion { get; set; }

        public string Estado { get; set; } = "Activo";

    }
}
