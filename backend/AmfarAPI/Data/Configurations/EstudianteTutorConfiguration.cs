using AmfarAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AmfarAPI.Data.Configurations;

public class EstudianteTutorConfiguration
    : IEntityTypeConfiguration<EstudianteTutor>
{
    public void Configure(EntityTypeBuilder<EstudianteTutor> entity)
    {
        entity.ToTable("estudiante_tutor");

        // ========================================
        // PRIMARY KEY COMPUESTA
        // ========================================

        entity.HasKey(et => new
        {
            et.IdEstudiante,
            et.IdTutor
        });

        entity.Property(et => et.IdEstudiante)
            .HasColumnName("id_estudiante");

        entity.Property(et => et.IdTutor)
            .HasColumnName("id_tutor");


        // ========================================
        // RELACION CON ESTUDIANTE
        // ========================================

        entity.HasOne(et => et.Estudiante)
            .WithMany(e => e.EstudiantesTutores)
            .HasForeignKey(et => et.IdEstudiante)
            .OnDelete(DeleteBehavior.Cascade);


        // ========================================
        // RELACION CON TUTOR
        // ========================================

        entity.HasOne(et => et.Tutor)
            .WithMany(t => t.EstudiantesTutores)
            .HasForeignKey(et => et.IdTutor)
            .OnDelete(DeleteBehavior.Cascade);
    }
}