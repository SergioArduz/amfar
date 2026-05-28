using AmfarAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AmfarAPI.Data.Configurations;

public class InstrumentoConfiguration : IEntityTypeConfiguration<Instrumento>
{
    public void Configure(EntityTypeBuilder<Instrumento> entity)
    {
        entity.ToTable("instrumento");

        entity.HasKey(i => i.IdInstrumento);

        entity.Property(i => i.IdInstrumento)
            .HasColumnName("id_instrumento")
            .ValueGeneratedOnAdd();

        entity.Property(i => i.Nombre)
            .HasColumnName("nombre")
            .HasMaxLength(100)
            .IsRequired();

        entity.Property(i => i.Tipo)
            .HasColumnName("tipo")
            .HasMaxLength(50)
            .IsRequired();

        entity.Property(i => i.StockTotal)
            .HasColumnName("stock_total")
            .HasDefaultValue(0);

        entity.Property(i => i.StockDisponible)
            .HasColumnName("stock_disponible")
            .HasDefaultValue(0);

        entity.Property(i => i.Estado)
            .HasColumnName("estado")
            .HasMaxLength(20)
            .HasDefaultValue("Disponible");

        entity.Property(i => i.CreatedAt)
            .HasColumnName("created_at")
            .HasDefaultValueSql("CURRENT_TIMESTAMP");

        entity.Property(i => i.UpdatedAt)
            .HasColumnName("updated_at");
    }
}
