namespace AmfarAPI.Models;

public class PrestamoInstrumento
{
    public int IdPrestamo { get; set; }
    public int IdInscripcion { get; set; }
    public int IdInstrumento { get; set; }
    public Instrumento Instrumento { get; set; } = null!;
    public bool EsPropio { get; set; }
    public DateTime FechaInicio { get; set; }
    public DateTime? FechaFin { get; set; }
    public string Estado { get; set; } = "Activo";
}
