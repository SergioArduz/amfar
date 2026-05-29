using AmfarAPI.DTOs.Usuario;

namespace AmfarAPI.Interfaces;

public interface IUsuarioService
{
    Task<IEnumerable<UsuarioDto>> GetAllAsync();

    Task<UsuarioDto?> GetByIdAsync(int id);

    Task CreateAsync(CreateUsuarioDto dto);

    Task UpdateAsync(int id, UpdateUsuarioDto dto);

    Task DeleteAsync(int id);
}