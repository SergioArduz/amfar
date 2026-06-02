using AmfarAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AmfarAPI.Data.Configurations;

public class UsuarioConfiguration : IEntityTypeConfiguration<Usuario>
{
    public void Configure(EntityTypeBuilder<Usuario> entity)
    {
        entity.ToTable("usuario");

        entity.HasKey(u => u.IdUsuario);

        entity.Property(u => u.IdUsuario)
            .HasColumnName("id_usuario");

        entity.Property(u => u.IdPersona)
            .HasColumnName("id_persona");

        entity.Property(u => u.Email)
            .HasColumnName("email")
            .HasMaxLength(150)
            .IsRequired();

        entity.Property(u => u.ContrasenaHash)
            .HasColumnName("contrasena")
            .IsRequired();


        entity.Property(u => u.Estado)
            .HasColumnName("estado")
            .HasMaxLength(20)
            .HasDefaultValue("Activo")
            .IsRequired();

        entity.Property(u => u.Rol)
            .HasColumnName("rol")
            .HasConversion<int>()
            .IsRequired();


        entity.HasIndex(u => u.Email)
            .IsUnique();

        entity.HasOne(u => u.Persona)
            .WithMany()
            .HasForeignKey(u => u.IdPersona)
            .OnDelete(DeleteBehavior.Cascade);

    }
}
