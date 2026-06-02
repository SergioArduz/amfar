using AmfarAPI.Data;
using AmfarAPI.Data.Repositories;
using AmfarAPI.Interfaces;
using AmfarAPI.Middleware;
using AmfarAPI.Models;
using AmfarAPI.Models.Enums;
using AmfarAPI.Repositories;
using AmfarAPI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

builder.Services.AddScoped<PersonaRepository>();
builder.Services.AddScoped<IPersonaService, PersonaService>();

builder.Services.AddScoped<IInstrumentoRepository, InstrumentoRepository>();
builder.Services.AddScoped<IProfesorRepository, ProfesorRepository>();
builder.Services.AddScoped<IPrestamoRepository, PrestamoRepository>();

builder.Services.AddScoped<IInstrumentoService, InstrumentoService>();
builder.Services.AddScoped<IProfesorService, ProfesorService>();
builder.Services.AddScoped<IPrestamoService, PrestamoService>();

builder.Services.AddScoped<UsuarioRepository>();
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<TutorRepository>();
builder.Services.AddScoped<ITutorService, TutorService>();
builder.Services.AddScoped<EstudianteRepository>();
builder.Services.AddScoped<IEstudianteService, EstudianteService>();

builder.Services.AddScoped<IPlanService, PlanService>();
builder.Services.AddScoped<IDescuentoService, DescuentoService>();
builder.Services.AddScoped<IInscripcionService, InscripcionService>();
builder.Services.AddScoped<IPagoService, PagoService>();
builder.Services.AddScoped<IReciboService, ReciboService>();
builder.Services.AddScoped<IReciboRepository, ReciboRepository>();
builder.Services.AddScoped<IInscripcionRepository, InscripcionRepository>();
builder.Services.AddScoped<IPlanRepository, PlanRepository>();
builder.Services.AddScoped<IDescuentoRepository, DescuentoRepository>();
builder.Services.AddScoped<IPagoRepository, PagoRepository>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173", "https://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllers();

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var jwtSettings = builder.Configuration.GetSection("Jwt");

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings["Issuer"],
            ValidAudience = jwtSettings["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtSettings["Key"]!)
            )
        };
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();
app.UseMiddleware<SecurityHeadersMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("ReactPolicy");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

if (app.Environment.IsDevelopment())
{
    using (var scope = app.Services.CreateScope())
    {
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        if (!context.Usuarios.Any())
        {
            var persona = new Persona
            {
                Nombre = "Admin",
                Apellido = "AMFAR",
                Telefono = "00000000"
            };

            context.Personas.Add(persona);
            await context.SaveChangesAsync();

            var usuario = new Usuario
            {
                IdPersona = persona.IdPersona,
                Email = "admin@amfar.com",
                ContrasenaHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
                Rol = Rol.Administrador
            };

            context.Usuarios.Add(usuario);
            await context.SaveChangesAsync();
        }
    }
}

app.Run();
