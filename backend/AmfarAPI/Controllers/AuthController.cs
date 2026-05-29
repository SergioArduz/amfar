using AmfarAPI.DTOs.Auth;
using AmfarAPI.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AmfarAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }


    // ========================================
    // LOGIN
    // ========================================

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var response =
            await _authService.LoginAsync(dto);

        if (response == null)
        {
            return Unauthorized(
                new
                {
                    mensaje =
                        "Correo o contraseña incorrectos"
                }
            );
        }

        return Ok(response);
    }


    // ========================================
    // LOGOUT
    // ========================================

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        return Ok(
            new
            {
                mensaje = "Sesión cerrada correctamente"
            }
        );
    }
}