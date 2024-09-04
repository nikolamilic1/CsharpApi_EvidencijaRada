using CsharpApi_EvidencijaRada.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// dodavanje baze podataka
builder.Services.AddDbContext<EvidencijaContext>(
    opcije =>
    {
        opcije.UseSqlServer(builder.Configuration.GetConnectionString("EvidencijaContext"));
    }
    
    );






var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(opcije =>
    {
        opcije.ConfigObject.AdditionalItems.Add("requestSnippetsEnabled", true);
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
