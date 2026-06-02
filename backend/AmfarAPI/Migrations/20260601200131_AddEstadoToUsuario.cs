using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AmfarAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddEstadoToUsuario : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "estado",
                table: "usuario",
                type: "character varying(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "Activo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "estado",
                table: "usuario");
        }
    }
}
