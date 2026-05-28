using AmfarAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AmfarAPI.Data.Configurations;

public class EspecialidadProfesorConfiguration : IEntityTypeConfiguration<EspecialidadProfesor>
{
    public void Configure(EntityTypeBuilder<EspecialidadProfesor> entity)
    {
        entity.ToTable("especialidad_profesor");

        entity.HasKey(ep => new { ep.IdProfesor, ep.IdInstrumento });

        entity.Property(ep => ep.IdProfesor)
            .HasColumnName("id_profesor");

        entity.Property(ep => ep.IdInstrumento)
            .HasColumnName("id_instrumento");

        entity.HasOne(ep => ep.Profesor)
            .WithMany(p => p.Especialidades)
            .HasForeignKey(ep => ep.IdProfesor)
            .OnDelete(DeleteBehavior.Cascade);

        entity.HasOne(ep => ep.Instrumento)
            .WithMany(i => i.EspecialidadProfesores)
            .HasForeignKey(ep => ep.IdInstrumento)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
