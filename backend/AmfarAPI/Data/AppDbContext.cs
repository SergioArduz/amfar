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

    public DbSet<Usuario> Usuarios { get; set; }

//Tutor
    public DbSet<Tutor> Tutores { get; set; }

//Estudiante
    public DbSet<Estudiante> Estudiantes { get; set; }

//EstudianteTutor
    public DbSet<EstudianteTutor> EstudiantesTutores { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}