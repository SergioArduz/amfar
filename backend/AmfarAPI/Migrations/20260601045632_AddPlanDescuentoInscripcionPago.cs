using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace AmfarAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddPlanDescuentoInscripcionPago : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "descuentos",
                columns: table => new
                {
                    Id_Descuento = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Codigo = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    NombreDescuento = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Porcentaje = table.Column<decimal>(type: "numeric(5,2)", nullable: false),
                    Descripcion = table.Column<string>(type: "text", nullable: false),
                    Estado = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, defaultValue: "Activo")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_descuentos", x => x.Id_Descuento);
                });

            migrationBuilder.CreateTable(
                name: "inscripciones",
                columns: table => new
                {
                    IdInscripcion = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Codigo = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    FechaInicio = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaFin = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Modalidad = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    MontoFinal = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    EstadoPago = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, defaultValue: "Pendiente"),
                    Estado = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, defaultValue: "Activo"),
                    CodigoEstudiante = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    CodigoPlan = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    CodigoDescuento = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inscripciones", x => x.IdInscripcion);
                });

            migrationBuilder.CreateTable(
                name: "pagos",
                columns: table => new
                {
                    IdPago = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Codigo = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    CodigoInscripcion = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    FechaGeneracion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaVencimiento = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaPago = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Monto = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    MetodoPago = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    EstadoPago = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, defaultValue: "Pendiente"),
                    Estado = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, defaultValue: "Activo")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pagos", x => x.IdPago);
                });

            migrationBuilder.CreateTable(
                name: "planes",
                columns: table => new
                {
                    Id_Plan = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Codigo = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    NombrePlan = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Monto = table.Column<decimal>(type: "numeric(10,2)", nullable: false),
                    HorasSemanales = table.Column<int>(type: "integer", nullable: false),
                    HorasMensuales = table.Column<int>(type: "integer", nullable: false),
                    EsIndividual = table.Column<bool>(type: "boolean", nullable: false),
                    Estado = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, defaultValue: "Activo")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_planes", x => x.Id_Plan);
                });

            migrationBuilder.CreateTable(
                name: "inscripcion_clases",
                columns: table => new
                {
                    IdInscripcionClase = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Codigo = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    IdInscripcion = table.Column<int>(type: "integer", nullable: false),
                    CodigoProfesor = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    CodigoInstrumento = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    InstrumentoPrestado = table.Column<bool>(type: "boolean", nullable: false),
                    DiaSemana = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    HoraInicio = table.Column<TimeSpan>(type: "interval", nullable: false),
                    HoraFin = table.Column<TimeSpan>(type: "interval", nullable: false),
                    Estado = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, defaultValue: "Activo")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inscripcion_clases", x => x.IdInscripcionClase);
                    table.ForeignKey(
                        name: "FK_inscripcion_clases_inscripciones_IdInscripcion",
                        column: x => x.IdInscripcion,
                        principalTable: "inscripciones",
                        principalColumn: "IdInscripcion",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_descuentos_Codigo",
                table: "descuentos",
                column: "Codigo",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_inscripcion_clases_IdInscripcion",
                table: "inscripcion_clases",
                column: "IdInscripcion");

            migrationBuilder.CreateIndex(
                name: "IX_inscripciones_Codigo",
                table: "inscripciones",
                column: "Codigo",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_pagos_Codigo",
                table: "pagos",
                column: "Codigo",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_planes_Codigo",
                table: "planes",
                column: "Codigo",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "descuentos");

            migrationBuilder.DropTable(
                name: "inscripcion_clases");

            migrationBuilder.DropTable(
                name: "pagos");

            migrationBuilder.DropTable(
                name: "planes");

            migrationBuilder.DropTable(
                name: "inscripciones");

            migrationBuilder.AddColumn<int>(
                name: "EstudianteIdPersona",
                table: "persona",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TutorIdPersona",
                table: "persona",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_persona_EstudianteIdPersona",
                table: "persona",
                column: "EstudianteIdPersona");

            migrationBuilder.CreateIndex(
                name: "IX_persona_TutorIdPersona",
                table: "persona",
                column: "TutorIdPersona");

            migrationBuilder.AddForeignKey(
                name: "FK_persona_estudiante_EstudianteIdPersona",
                table: "persona",
                column: "EstudianteIdPersona",
                principalTable: "estudiante",
                principalColumn: "id_persona");

            migrationBuilder.AddForeignKey(
                name: "FK_persona_tutor_TutorIdPersona",
                table: "persona",
                column: "TutorIdPersona",
                principalTable: "tutor",
                principalColumn: "id_persona");
        }
    }
}
