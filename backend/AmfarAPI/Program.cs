using AmfarAPI.Data;
using AmfarAPI.Data.Repositories;
using AmfarAPI.Interfaces;
using AmfarAPI.Repositories;
using AmfarAPI.Services;
using Microsoft.EntityFrameworkCore;

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

builder.Services.AddScoped<PersonaRepository>();

builder.Services.AddScoped<IPersonaService, PersonaService>();

builder.Services.AddScoped<IInstrumentoRepository, InstrumentoRepository>();
builder.Services.AddScoped<IProfesorRepository, ProfesorRepository>();
builder.Services.AddScoped<IPrestamoRepository, PrestamoRepository>();

builder.Services.AddScoped<IInstrumentoService, InstrumentoService>();
builder.Services.AddScoped<IProfesorService, ProfesorService>();
builder.Services.AddScoped<IPrestamoService, PrestamoService>();


// ========================================
// CONTROLLERS
// ========================================

builder.Services.AddControllers();


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

app.UseAuthorization();

app.MapControllers();


// ========================================
// RUN
// ========================================

app.Run();
