namespace AmfarAPI.DTOs;

public class CrearProfesorRequest
{
    public string Nombre { get; set; } = string.Empty;
    public string Apellido { get; set; } = string.Empty;
    public string Telefono { get; set; } = string.Empty;
    public List<int> IdsInstrumentos { get; set; } = new();
}

public class ActualizarProfesorRequest
{
    public string? Nombre { get; set; }
    public string? Apellido { get; set; }
    public string? Telefono { get; set; }
    public List<int>? IdsInstrumentos { get; set; }
}

public class AgregarEspecialidadRequest
{
    public int IdInstrumento { get; set; }
}

public class ProfesorResponse
{
    public int IdProfesor { get; set; }
    public int IdPersona { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Apellido { get; set; } = string.Empty;
    public string NombreCompleto { get; set; } = string.Empty;
    public string Telefono { get; set; } = string.Empty;
    public string Estado { get; set; } = string.Empty;
    public DateTime FechaRegistro { get; set; }
    public List<InstrumentoEspecialidadResponse> Especialidades { get; set; } = new();
}

public class InstrumentoEspecialidadResponse
{
    public int IdInstrumento { get; set; }
    public string NombreInstrumento { get; set; } = string.Empty;
}
