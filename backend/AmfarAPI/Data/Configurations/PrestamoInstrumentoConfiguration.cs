using AmfarAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AmfarAPI.Data.Configurations;

public class PrestamoInstrumentoConfiguration : IEntityTypeConfiguration<PrestamoInstrumento>
{
    public void Configure(EntityTypeBuilder<PrestamoInstrumento> entity)
    {
        entity.ToTable("prestamo_instrumento");

        entity.HasKey(p => p.IdPrestamo);

        entity.Property(p => p.IdPrestamo)
            .HasColumnName("id_prestamo")
            .ValueGeneratedOnAdd();

        entity.Property(p => p.IdInscripcion)
            .HasColumnName("id_inscripcion");

        entity.Property(p => p.IdInstrumento)
            .HasColumnName("id_instrumento");

        entity.Property(p => p.EsPropio)
            .HasColumnName("es_propio")
            .HasDefaultValue(false);

        entity.Property(p => p.FechaInicio)
            .HasColumnName("fecha_inicio")
            .IsRequired();

        entity.Property(p => p.FechaFin)
            .HasColumnName("fecha_fin");

        entity.Property(p => p.Estado)
            .HasColumnName("estado")
            .HasMaxLength(20)
            .HasDefaultValue("Activo");

        entity.HasOne(p => p.Instrumento)
            .WithMany(i => i.Prestamos)
            .HasForeignKey(p => p.IdInstrumento)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
