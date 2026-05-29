using AmfarAPI.DTOs.Auth;

namespace AmfarAPI.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto?> LoginAsync(LoginDto dto);
}