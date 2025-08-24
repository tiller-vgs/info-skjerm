using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddJsonOptions(options => { });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default"))
);

// Add memory cache for weather data
builder.Services.AddMemoryCache();

// Add HttpClient with basic configuration
builder.Services.AddHttpClient(
    "WeatherClient",
    client =>
    {
        client.Timeout = TimeSpan.FromSeconds(10); // Even shorter timeout
        client.DefaultRequestHeaders.Add("User-Agent", "info-skjerm-api/1.0");
        client.DefaultRequestHeaders.Add("Accept", "application/json");
    }
);

builder.Services.AddHttpClient(
    "BusClient",
    client =>
    {
        client.Timeout = TimeSpan.FromSeconds(10); // Even shorter timeout
        client.DefaultRequestHeaders.Add("ET-Client-Name", "tillervgs-infoskjerm");
        client.DefaultRequestHeaders.Add("Accept", "application/json");
    }
);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Info-skjerm v�r-api");
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors(builder =>
{
    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
});

app.MapControllers();

app.Run();
