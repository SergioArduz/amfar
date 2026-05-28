using AmfarAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AmfarAPI.Data.Configurations;

public class ProfesorConfiguration : IEntityTypeConfiguration<Profesor>
{
    public void Configure(EntityTypeBuilder<Profesor> entity)
    {
        entity.ToTable("profesor");

        entity.HasKey(p => p.IdProfesor);

        entity.Property(p => p.IdProfesor)
            .HasColumnName("id_profesor")
            .ValueGeneratedOnAdd();

        entity.Property(p => p.IdPersona)
            .HasColumnName("id_persona");

        entity.Property(p => p.Estado)
            .HasColumnName("estado")
            .HasMaxLength(20)
            .HasDefaultValue("Activo");

        entity.Property(p => p.FechaRegistro)
            .HasColumnName("fecha_registro")
            .HasDefaultValueSql("CURRENT_TIMESTAMP");

        entity.HasOne(p => p.Persona)
            .WithMany()
            .HasForeignKey(p => p.IdPersona)
            .OnDelete(DeleteBehavior.Restrict);

        entity.HasMany(p => p.Especialidades)
            .WithOne(e => e.Profesor)
            .HasForeignKey(e => e.IdProfesor)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
