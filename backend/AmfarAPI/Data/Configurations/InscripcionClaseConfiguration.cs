using AmfarAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AmfarAPI.Data.Configurations;

public class InscripcionClaseConfiguration : IEntityTypeConfiguration<InscripcionClase>
{
    public void Configure(EntityTypeBuilder<InscripcionClase> builder)
    {
        builder.ToTable("inscripcion_clases");

        builder.HasKey(ic => ic.IdInscripcionClase);

        builder.Property(ic => ic.Codigo)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(ic => ic.CodigoProfesor)
            .HasMaxLength(50);

        builder.Property(ic => ic.CodigoInstrumento)
            .HasMaxLength(50)
            .IsRequired(false);

        builder.Property(ic => ic.DiaSemana)
            .HasMaxLength(20);

        builder.Property(ic => ic.HoraInicio)
            .HasColumnType("interval");

        builder.Property(ic => ic.HoraFin)
            .HasColumnType("interval");

        builder.Property(ic => ic.Estado)
            .HasMaxLength(20)
            .HasDefaultValue("Activo");
    }
}
