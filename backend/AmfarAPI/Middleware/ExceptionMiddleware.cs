using System.Net;
using System.Text.Json;

namespace AmfarAPI.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "Error de validación");
            context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            context.Response.ContentType = "application/json";

            var response = JsonSerializer.Serialize(new { mensaje = ex.Message });
            await context.Response.WriteAsync(response);
        }
        catch (KeyNotFoundException ex)
        {
            _logger.LogWarning(ex, "Recurso no encontrado");
            context.Response.StatusCode = (int)HttpStatusCode.NotFound;
            context.Response.ContentType = "application/json";

            var response = JsonSerializer.Serialize(new { mensaje = ex.Message });
            await context.Response.WriteAsync(response);
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogWarning(ex, "Operación inválida");
            context.Response.StatusCode = (int)HttpStatusCode.Conflict;
            context.Response.ContentType = "application/json";

            var response = JsonSerializer.Serialize(new { mensaje = ex.Message });
            await context.Response.WriteAsync(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error interno del servidor");
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            context.Response.ContentType = "application/json";

            var response = JsonSerializer.Serialize(new { mensaje = "Error interno del servidor" });
            await context.Response.WriteAsync(response);
        }
    }
}
