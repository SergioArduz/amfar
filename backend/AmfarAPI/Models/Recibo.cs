using System.ComponentModel.DataAnnotations;

namespace AmfarAPI.Models;

public class Recibo
{
    [Key]
    public int IdRecibo { get; set; }

    public string NumeroRecibo { get; set; } = string.Empty;

    public DateTime FechaEmision { get; set; }

    public int PagoId { get; set; }

    public int UsuarioEmisorId { get; set; }
}