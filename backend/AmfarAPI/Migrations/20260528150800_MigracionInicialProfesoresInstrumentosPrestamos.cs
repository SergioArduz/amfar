using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace AmfarAPI.Migrations
{
    /// <inheritdoc />
    public partial class MigracionInicialProfesoresInstrumentosPrestamos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "instrumento",
                columns: table => new
                {
                    id_instrumento = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nombre = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    tipo = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    stock_total = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    stock_disponible = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    estado = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, defaultValue: "Disponible"),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_instrumento", x => x.id_instrumento);
                });

            migrationBuilder.CreateTable(
                name: "persona",
                columns: table => new
                {
                    id_persona = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nombre = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    apellido = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    telefono = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_persona", x => x.id_persona);
                });

            migrationBuilder.CreateTable(
                name: "prestamo_instrumento",
                columns: table => new
                {
                    id_prestamo = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_inscripcion = table.Column<int>(type: "integer", nullable: false),
                    id_instrumento = table.Column<int>(type: "integer", nullable: false),
                    es_propio = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    fecha_inicio = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    fecha_fin = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    estado = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, defaultValue: "Activo")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_prestamo_instrumento", x => x.id_prestamo);
                    table.ForeignKey(
                        name: "FK_prestamo_instrumento_instrumento_id_instrumento",
                        column: x => x.id_instrumento,
                        principalTable: "instrumento",
                        principalColumn: "id_instrumento",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "profesor",
                columns: table => new
                {
                    id_profesor = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_persona = table.Column<int>(type: "integer", nullable: false),
                    estado = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, defaultValue: "Activo"),
                    fecha_registro = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_profesor", x => x.id_profesor);
                    table.ForeignKey(
                        name: "FK_profesor_persona_id_persona",
                        column: x => x.id_persona,
                        principalTable: "persona",
                        principalColumn: "id_persona",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "especialidad_profesor",
                columns: table => new
                {
                    id_profesor = table.Column<int>(type: "integer", nullable: false),
                    id_instrumento = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_especialidad_profesor", x => new { x.id_profesor, x.id_instrumento });
                    table.ForeignKey(
                        name: "FK_especialidad_profesor_instrumento_id_instrumento",
                        column: x => x.id_instrumento,
                        principalTable: "instrumento",
                        principalColumn: "id_instrumento",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_especialidad_profesor_profesor_id_profesor",
                        column: x => x.id_profesor,
                        principalTable: "profesor",
                        principalColumn: "id_profesor",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_especialidad_profesor_id_instrumento",
                table: "especialidad_profesor",
                column: "id_instrumento");

            migrationBuilder.CreateIndex(
                name: "IX_prestamo_instrumento_id_instrumento",
                table: "prestamo_instrumento",
                column: "id_instrumento");

            migrationBuilder.CreateIndex(
                name: "IX_profesor_id_persona",
                table: "profesor",
                column: "id_persona");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "especialidad_profesor");

            migrationBuilder.DropTable(
                name: "prestamo_instrumento");

            migrationBuilder.DropTable(
                name: "profesor");

            migrationBuilder.DropTable(
                name: "instrumento");

            migrationBuilder.DropTable(
                name: "persona");
        }
    }
}
