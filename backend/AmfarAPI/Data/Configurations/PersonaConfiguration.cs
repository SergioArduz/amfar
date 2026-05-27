using AmfarAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AmfarAPI.Data.Configurations;

public class PersonaConfiguration : IEntityTypeConfiguration<Persona>
{
    public void Configure(EntityTypeBuilder<Persona> entity)
    {
        entity.ToTable("persona");

        entity.HasKey(p => p.IdPersona);

        entity.Property(p => p.IdPersona)
            .HasColumnName("id_persona");

        entity.Property(p => p.Nombre)
            .HasColumnName("nombre")
            .HasMaxLength(100)
            .IsRequired();

        entity.Property(p => p.Apellido)
            .HasColumnName("apellido")
            .HasMaxLength(100)
            .IsRequired();

        entity.Property(p => p.Telefono)
            .HasColumnName("telefono")
            .HasMaxLength(20)
            .IsRequired();
    }
}