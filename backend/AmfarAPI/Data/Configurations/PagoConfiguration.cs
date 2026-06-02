using AmfarAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AmfarAPI.Data.Configurations;

public class PagoConfiguration : IEntityTypeConfiguration<Pago>
{
    public void Configure(EntityTypeBuilder<Pago> builder)
    {
        builder.ToTable("pagos");

        builder.HasKey(p => p.IdPago);

        builder.Property(p => p.Codigo)
            .HasMaxLength(50)
            .IsRequired();

        builder.HasIndex(p => p.Codigo)
            .IsUnique();

        builder.Property(p => p.CodigoInscripcion)
            .HasMaxLength(50);

        builder.Property(p => p.FechaGeneracion)
            .HasColumnType("timestamp with time zone");

        builder.Property(p => p.FechaVencimiento)
            .HasColumnType("timestamp with time zone");

        builder.Property(p => p.FechaPago)
            .HasColumnType("timestamp with time zone")
            .IsRequired(false);

        builder.Property(p => p.Monto)
            .HasColumnType("decimal(10,2)");

        builder.Property(p => p.MetodoPago)
            .HasMaxLength(50);

        builder.Property(p => p.EstadoPago)
            .HasMaxLength(20)
            .HasDefaultValue("Pendiente");

        builder.Property(p => p.Estado)
            .HasMaxLength(20)
            .HasDefaultValue("Activo");
    }
}
