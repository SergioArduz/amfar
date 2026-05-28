using AmfarAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AmfarAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Persona> Personas { get; set; }
    public DbSet<Instrumento> Instrumentos { get; set; }
    public DbSet<Profesor> Profesores { get; set; }
    public DbSet<EspecialidadProfesor> EspecialidadProfesores { get; set; }
    public DbSet<PrestamoInstrumento> PrestamosInstrumentos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}