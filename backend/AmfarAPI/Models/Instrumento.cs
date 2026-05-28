namespace AmfarAPI.Models;

public class Instrumento
{
    public int IdInstrumento { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Tipo { get; set; } = string.Empty;
    public int StockTotal { get; set; }
    public int StockDisponible { get; set; }
    public string Estado { get; set; } = "Disponible";
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    public ICollection<EspecialidadProfesor> EspecialidadProfesores { get; set; } = new List<EspecialidadProfesor>();
    public ICollection<PrestamoInstrumento> Prestamos { get; set; } = new List<PrestamoInstrumento>();
}
