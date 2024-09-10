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

// Svi se od svuda na sve moguæe naèine mogu spojiti na naš API
// Čitati https://code-maze.com/aspnetcore-webapi-best-practices/
builder.Services.AddCors(opcije =>
{
    opcije.AddPolicy("CorsPolicy",
        builder =>
            builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
    );

});




var app = builder.Build();

//Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI(opcije =>
    {
        opcije.ConfigObject.AdditionalItems.Add("requestSnippetsEnabled", true);
        opcije.EnableTryItOutByDefault();
    });
//}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();


// za potrebe produkcije
app.UseStaticFiles();
app.UseDefaultFiles();
app.MapFallbackToFile("index.html");

app.UseCors("CorsPolicy");
//  Završio potrebe produkcije

app.Run();


