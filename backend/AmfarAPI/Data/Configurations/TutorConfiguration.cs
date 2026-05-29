using AmfarAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AmfarAPI.Data.Configurations;

public class TutorConfiguration : IEntityTypeConfiguration<Tutor>
{
    public void Configure(EntityTypeBuilder<Tutor> entity)
    {
        entity.ToTable("tutor");

        // PRIMARY KEY
        entity.HasKey(t => t.IdPersona);

        entity.Property(t => t.IdPersona)
            .HasColumnName("id_persona");

        entity.Property(t => t.Parentesco)
            .HasColumnName("parentesco")
            .HasMaxLength(50);

        // RELACION 1 A 1
        entity.HasOne(t => t.Persona)
            .WithOne(p => p.Tutor)
            .HasForeignKey<Tutor>(t => t.IdPersona)
            .OnDelete(DeleteBehavior.Cascade);
    }
}