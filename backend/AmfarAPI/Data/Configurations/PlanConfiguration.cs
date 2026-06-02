using AmfarAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AmfarAPI.Data.Configurations;

public class PlanConfiguration : IEntityTypeConfiguration<Plan>
{
    public void Configure(EntityTypeBuilder<Plan> builder)
    {
        builder.ToTable("planes");

        builder.HasKey(p => p.Id_Plan);

        builder.Property(p => p.Codigo)
            .HasMaxLength(50)
            .IsRequired();

        builder.HasIndex(p => p.Codigo)
            .IsUnique();

        builder.Property(p => p.NombrePlan)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(p => p.Monto)
            .HasColumnType("decimal(10,2)");

        builder.Property(p => p.Estado)
            .HasMaxLength(20)
            .HasDefaultValue("Activo");
    }
}
