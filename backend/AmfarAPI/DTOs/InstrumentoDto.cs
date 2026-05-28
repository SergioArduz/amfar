namespace AmfarAPI.DTOs;

public class CrearInstrumentoRequest
{
    public string Nombre { get; set; } = string.Empty;
    public string Tipo { get; set; } = string.Empty;
    public int StockTotal { get; set; }
}

public class ActualizarInstrumentoRequest
{
    public string? Nombre { get; set; }
    public string? Tipo { get; set; }
    public int? StockTotal { get; set; }
}

public class CambiarEstadoInstrumentoRequest
{
    public string Estado { get; set; } = string.Empty;
}

public class InstrumentoResponse
{
    public int IdInstrumento { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Tipo { get; set; } = string.Empty;
    public int StockTotal { get; set; }
    public int StockDisponible { get; set; }
    public string Estado { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}

public class DisponibilidadResponse
{
    public int IdInstrumento { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public bool Disponible { get; set; }
    public int StockDisponible { get; set; }
}
