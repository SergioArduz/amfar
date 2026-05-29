using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace AmfarAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddTutorEstudiante : Migration
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
                });

            migrationBuilder.CreateTable(
                name: "estudiante",
                columns: table => new
                {
                    id_persona = table.Column<int>(type: "integer", nullable: false),
                    tiene_instrumento = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_estudiante", x => x.id_persona);
                });

            migrationBuilder.CreateTable(
                name: "estudiante_tutor",
                columns: table => new
                {
                    id_estudiante = table.Column<int>(type: "integer", nullable: false),
                    id_tutor = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_estudiante_tutor", x => new { x.id_estudiante, x.id_tutor });
                    table.ForeignKey(
                        name: "FK_estudiante_tutor_estudiante_id_estudiante",
                        column: x => x.id_estudiante,
                        principalTable: "estudiante",
                        principalColumn: "id_persona",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "persona",
                columns: table => new
                {
                    id_persona = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nombre = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    apellido = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    telefono = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    UsuarioIdUsuario = table.Column<int>(type: "integer", nullable: true),
                    TutorIdPersona = table.Column<int>(type: "integer", nullable: true),
                    EstudianteIdPersona = table.Column<int>(type: "integer", nullable: true),
                    ProfesorIdProfesor = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_persona", x => x.id_persona);
                    table.ForeignKey(
                        name: "FK_persona_estudiante_EstudianteIdPersona",
                        column: x => x.EstudianteIdPersona,
                        principalTable: "estudiante",
                        principalColumn: "id_persona");
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
                name: "tutor",
                columns: table => new
                {
                    id_persona = table.Column<int>(type: "integer", nullable: false),
                    parentesco = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tutor", x => x.id_persona);
                    table.ForeignKey(
                        name: "FK_tutor_persona_id_persona",
                        column: x => x.id_persona,
                        principalTable: "persona",
                        principalColumn: "id_persona",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "usuario",
                columns: table => new
                {
                    id_usuario = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_persona = table.Column<int>(type: "integer", nullable: false),
                    email = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    contrasena = table.Column<string>(type: "text", nullable: false),
                    rol = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usuario", x => x.id_usuario);
                    table.ForeignKey(
                        name: "FK_usuario_persona_id_persona",
                        column: x => x.id_persona,
                        principalTable: "persona",
                        principalColumn: "id_persona",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_especialidad_profesor_id_instrumento",
                table: "especialidad_profesor",
                column: "id_instrumento");

            migrationBuilder.CreateIndex(
                name: "IX_estudiante_tutor_id_tutor",
                table: "estudiante_tutor",
                column: "id_tutor");

            migrationBuilder.CreateIndex(
                name: "IX_persona_EstudianteIdPersona",
                table: "persona",
                column: "EstudianteIdPersona");

            migrationBuilder.CreateIndex(
                name: "IX_persona_ProfesorIdProfesor",
                table: "persona",
                column: "ProfesorIdProfesor");

            migrationBuilder.CreateIndex(
                name: "IX_persona_TutorIdPersona",
                table: "persona",
                column: "TutorIdPersona");

            migrationBuilder.CreateIndex(
                name: "IX_persona_UsuarioIdUsuario",
                table: "persona",
                column: "UsuarioIdUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_prestamo_instrumento_id_instrumento",
                table: "prestamo_instrumento",
                column: "id_instrumento");

            migrationBuilder.CreateIndex(
                name: "IX_profesor_id_persona",
                table: "profesor",
                column: "id_persona");

            migrationBuilder.CreateIndex(
                name: "IX_usuario_email",
                table: "usuario",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_usuario_id_persona",
                table: "usuario",
                column: "id_persona");

            migrationBuilder.AddForeignKey(
                name: "FK_especialidad_profesor_profesor_id_profesor",
                table: "especialidad_profesor",
                column: "id_profesor",
                principalTable: "profesor",
                principalColumn: "id_profesor",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_estudiante_persona_id_persona",
                table: "estudiante",
                column: "id_persona",
                principalTable: "persona",
                principalColumn: "id_persona",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_estudiante_tutor_tutor_id_tutor",
                table: "estudiante_tutor",
                column: "id_tutor",
                principalTable: "tutor",
                principalColumn: "id_persona",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_persona_profesor_ProfesorIdProfesor",
                table: "persona",
                column: "ProfesorIdProfesor",
                principalTable: "profesor",
                principalColumn: "id_profesor");

            migrationBuilder.AddForeignKey(
                name: "FK_persona_tutor_TutorIdPersona",
                table: "persona",
                column: "TutorIdPersona",
                principalTable: "tutor",
                principalColumn: "id_persona");

            migrationBuilder.AddForeignKey(
                name: "FK_persona_usuario_UsuarioIdUsuario",
                table: "persona",
                column: "UsuarioIdUsuario",
                principalTable: "usuario",
                principalColumn: "id_usuario");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_persona_profesor_ProfesorIdProfesor",
                table: "persona");

            migrationBuilder.DropForeignKey(
                name: "FK_estudiante_persona_id_persona",
                table: "estudiante");

            migrationBuilder.DropForeignKey(
                name: "FK_tutor_persona_id_persona",
                table: "tutor");

            migrationBuilder.DropForeignKey(
                name: "FK_usuario_persona_id_persona",
                table: "usuario");

            migrationBuilder.DropTable(
                name: "especialidad_profesor");

            migrationBuilder.DropTable(
                name: "estudiante_tutor");

            migrationBuilder.DropTable(
                name: "prestamo_instrumento");

            migrationBuilder.DropTable(
                name: "instrumento");

            migrationBuilder.DropTable(
                name: "profesor");

            migrationBuilder.DropTable(
                name: "persona");

            migrationBuilder.DropTable(
                name: "estudiante");

            migrationBuilder.DropTable(
                name: "tutor");

            migrationBuilder.DropTable(
                name: "usuario");
        }
    }
}
