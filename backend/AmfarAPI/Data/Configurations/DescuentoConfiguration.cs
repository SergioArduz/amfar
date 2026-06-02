using AmfarAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AmfarAPI.Data.Configurations;

public class DescuentoConfiguration : IEntityTypeConfiguration<Descuento>
{
    public void Configure(EntityTypeBuilder<Descuento> builder)
    {
        builder.ToTable("descuentos");

        builder.HasKey(d => d.Id_Descuento);

        builder.Property(d => d.Codigo)
            .HasMaxLength(50)
            .IsRequired();

        builder.HasIndex(d => d.Codigo)
            .IsUnique();

        builder.Property(d => d.NombreDescuento)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(d => d.Porcentaje)
            .HasColumnType("decimal(5,2)");

        builder.Property(d => d.Estado)
            .HasMaxLength(20)
            .HasDefaultValue("Activo");
    }
}
