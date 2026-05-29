using AmfarAPI.Data;
using AmfarAPI.Data.Repositories;
using AmfarAPI.Interfaces;
using AmfarAPI.Repositories;
using AmfarAPI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


// ========================================
// DATABASE
// ========================================

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);


// ========================================
// DEPENDENCY INJECTION
// ========================================

//Persona
builder.Services.AddScoped<PersonaRepository>();

builder.Services.AddScoped<IPersonaService, PersonaService>();

builder.Services.AddScoped<IInstrumentoRepository, InstrumentoRepository>();
builder.Services.AddScoped<IProfesorRepository, ProfesorRepository>();
builder.Services.AddScoped<IPrestamoRepository, PrestamoRepository>();

builder.Services.AddScoped<IInstrumentoService, InstrumentoService>();
builder.Services.AddScoped<IProfesorService, ProfesorService>();
builder.Services.AddScoped<IPrestamoService, PrestamoService>();
//Usuario
builder.Services.AddScoped<UsuarioRepository>();

builder.Services.AddScoped<IUsuarioService, UsuarioService>();

//Auth
builder.Services.AddScoped<IAuthService, AuthService>();

// Tutor
builder.Services.AddScoped<TutorRepository>();

builder.Services.AddScoped<ITutorService, TutorService>();

//Estudiante
builder.Services.AddScoped<EstudianteRepository>();

builder.Services.AddScoped<
    IEstudianteService,
    EstudianteService
>();
// ========================================
// CONTROLLERS
// ========================================

builder.Services.AddControllers();

// ========================================
// JWT AUTHENTICATION
// ========================================

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var jwtSettings =
            builder.Configuration.GetSection("Jwt");

        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                ValidateIssuer = true,

                ValidateAudience = true,

                ValidateLifetime = true,

                ValidateIssuerSigningKey = true,

                ValidIssuer = jwtSettings["Issuer"],

                ValidAudience = jwtSettings["Audience"],

                IssuerSigningKey =
                    new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(
                            jwtSettings["Key"]!
                        )
                    )
            };
    });


// ========================================
// SWAGGER
// ========================================

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();


// ========================================
// BUILD APP
// ========================================

var app = builder.Build();


// ========================================
// MIDDLEWARES
// ========================================

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();


// ========================================
// RUN
// ========================================

app.Run();
