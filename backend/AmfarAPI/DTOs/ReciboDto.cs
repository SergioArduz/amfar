namespace AmfarAPI.DTOs;

public class ReciboDto
{
    public string NumeroRecibo { get; set; } = string.Empty;

    public decimal Monto { get; set; }

    public DateTime FechaPago { get; set; }
}