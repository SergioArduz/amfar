using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AmfarAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddEstadoToEstudianteAndTutor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Estado",
                table: "tutor",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Estado",
                table: "estudiante",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Estado",
                table: "tutor");

            migrationBuilder.DropColumn(
                name: "Estado",
                table: "estudiante");
        }
    }
}
