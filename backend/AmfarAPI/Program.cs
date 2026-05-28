using AmfarAPI.Data;
using AmfarAPI.Data.Repositories;
using AmfarAPI.Interfaces;
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

