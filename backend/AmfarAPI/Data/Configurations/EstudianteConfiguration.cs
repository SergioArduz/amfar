using AmfarAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AmfarAPI.Data.Configurations;

public class EstudianteConfiguration : IEntityTypeConfiguration<Estudiante>
{
    public void Configure(EntityTypeBuilder<Estudiante> entity)
    {
        entity.ToTable("estudiante");

        // ========================================
        // PRIMARY KEY
        // ========================================

        entity.HasKey(e => e.IdPersona);

        entity.Property(e => e.IdPersona)
            .HasColumnName("id_persona");

        entity.Property(e => e.TieneInstrumento)
            .HasColumnName("tiene_instrumento")
            .IsRequired();


        // ========================================
        // RELACION 1 A 1 CON PERSONA
        // ========================================

        entity.HasOne(e => e.Persona)
            .WithOne(p => p.Estudiante)
            .HasForeignKey<Estudiante>(e => e.IdPersona)
            .OnDelete(DeleteBehavior.Cascade);
    }
}