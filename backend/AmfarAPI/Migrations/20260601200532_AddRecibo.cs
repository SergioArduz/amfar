using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace AmfarAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddRecibo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "recibo",
                columns: table => new
                {
                    id_recibo = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    numero_recibo = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    codigo_pago = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    fecha_emision = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    monto = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    datos_alumno = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    nombre_plan = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    periodo = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    emitido_por = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    estado = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, defaultValue: "Activo")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_recibo", x => x.id_recibo);
                });

            migrationBuilder.CreateIndex(
                name: "IX_recibo_codigo_pago",
                table: "recibo",
                column: "codigo_pago");

            migrationBuilder.CreateIndex(
                name: "IX_recibo_numero_recibo",
                table: "recibo",
                column: "numero_recibo",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "recibo");
        }
    }
}
