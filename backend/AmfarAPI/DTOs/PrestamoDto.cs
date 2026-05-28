namespace AmfarAPI.DTOs;

public class CrearPrestamoRequest
{
    public int IdInscripcion { get; set; }
    public int IdInstrumento { get; set; }
    public bool EsPropio { get; set; }
    public DateTime FechaInicio { get; set; }
}

public class DevolucionRequest
{
    public DateTime FechaFin { get; set; }
}

public class PrestamoResponse
{
    public int IdPrestamo { get; set; }
    public int IdInscripcion { get; set; }
    public int IdInstrumento { get; set; }
    public string NombreInstrumento { get; set; } = string.Empty;
    public bool EsPropio { get; set; }
    public DateTime FechaInicio { get; set; }
    public DateTime? FechaFin { get; set; }
    public string Estado { get; set; } = string.Empty;
}
