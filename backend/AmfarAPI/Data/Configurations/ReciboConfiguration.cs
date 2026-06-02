using AmfarAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AmfarAPI.Data.Configurations
{
    public class ReciboConfiguration : IEntityTypeConfiguration<Recibo>
    {
        public void Configure(EntityTypeBuilder<Recibo> entity)
        {
            entity.ToTable("recibo");

            entity.HasKey(r => r.IdRecibo);

            entity.Property(r => r.IdRecibo)
                .HasColumnName("id_recibo");

            entity.Property(r => r.NumeroRecibo)
                .HasColumnName("numero_recibo")
                .HasMaxLength(20)
                .IsRequired();

            entity.Property(r => r.CodigoPago)
                .HasColumnName("codigo_pago")
                .HasMaxLength(50)
                .IsRequired();

            entity.Property(r => r.FechaEmision)
                .HasColumnName("fecha_emision")
                .IsRequired();

            entity.Property(r => r.Monto)
                .HasColumnName("monto")
                .HasColumnType("decimal(18,2)")
                .IsRequired();

            entity.Property(r => r.DatosAlumno)
                .HasColumnName("datos_alumno")
                .HasMaxLength(200)
                .IsRequired();

            entity.Property(r => r.NombrePlan)
                .HasColumnName("nombre_plan")
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(r => r.Periodo)
                .HasColumnName("periodo")
                .HasMaxLength(50)
                .IsRequired();

            entity.Property(r => r.EmitidoPor)
                .HasColumnName("emitido_por")
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(r => r.Estado)
                .HasColumnName("estado")
                .HasMaxLength(20)
                .HasDefaultValue("Activo")
                .IsRequired();

            entity.HasIndex(r => r.NumeroRecibo)
                .IsUnique();

            entity.HasIndex(r => r.CodigoPago);
        }
    }
}
