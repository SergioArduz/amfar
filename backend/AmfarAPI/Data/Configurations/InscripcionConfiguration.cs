using AmfarAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AmfarAPI.Data.Configurations;

public class InscripcionConfiguration : IEntityTypeConfiguration<Inscripcion>
{
    public void Configure(EntityTypeBuilder<Inscripcion> builder)
    {
        builder.ToTable("inscripciones");

        builder.HasKey(i => i.IdInscripcion);

        builder.Property(i => i.Codigo)
            .HasMaxLength(50)
            .IsRequired();

        builder.HasIndex(i => i.Codigo)
            .IsUnique();

        builder.Property(i => i.FechaInicio)
            .HasColumnType("timestamp with time zone");

        builder.Property(i => i.FechaFin)
            .HasColumnType("timestamp with time zone");

        builder.Property(i => i.Modalidad)
            .HasMaxLength(50);

        builder.Property(i => i.MontoFinal)
            .HasColumnType("decimal(10,2)");

        builder.Property(i => i.EstadoPago)
            .HasMaxLength(20)
            .HasDefaultValue("Pendiente");

        builder.Property(i => i.Estado)
            .HasMaxLength(20)
            .HasDefaultValue("Activo");

        builder.Property(i => i.CodigoEstudiante)
            .HasMaxLength(50);

        builder.Property(i => i.CodigoPlan)
            .HasMaxLength(50);

        builder.Property(i => i.CodigoDescuento)
            .HasMaxLength(50)
            .IsRequired(false);

        builder.HasMany(i => i.InscripcionClases)
            .WithOne(ic => ic.Inscripcion)
            .HasForeignKey(ic => ic.IdInscripcion)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
