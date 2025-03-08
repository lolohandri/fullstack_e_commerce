using API.Middleware;
using Core.Interfaces;
using Core.Interfaces.Repositories;
using Core.Interfaces.Services;
using Infrastructure.Data;
using Infrastructure.Data.Repositories;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

#region Container

    builder.Services.AddControllers();

    builder.Services.AddDbContext<StoreContext>(opt =>
    {
        opt.UseNpgsql(builder.Configuration.GetConnectionString("StoreDatabase"));
    });

    // builder.Services.AddCors(options =>
    // {
    //     options.AddPolicy("AllowAll", policy =>
    //     {
    //         policy.AllowAnyOrigin()   // Allow any origin
    //             .AllowAnyMethod()   // Allow any HTTP method (GET, POST, etc.)
    //             .AllowAnyHeader();  // Allow any header
    //     });
    // });

#endregion 

#region Dependencies

    builder.Services.AddScoped<IProductRepository, ProductRepository>();
    builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
    builder.Services.AddSingleton<IConnectionMultiplexer>(_ =>
    {
        var connectionString = builder.Configuration.GetConnectionString("Redis") ?? 
                               throw new ApplicationException("Redis connection string is missing");
        
        var configuration = ConfigurationOptions.Parse(connectionString, true);
        
        return ConnectionMultiplexer.Connect(configuration);
    });
    builder.Services.AddSingleton<ICartService, CartService>();
    
#endregion


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseMiddleware<ExceptionMiddleware>();

app.UseCors(x => x.AllowAnyHeader()
    .AllowAnyMethod()
    .WithOrigins(
    "http://localhost:4200", 
    "https://localhost:4200"));

try
{
    using var scope = app.Services.CreateScope();
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<StoreContext>();
    
    await context.Database.MigrateAsync();
    await StoreContextSeed.SeedAsync(context);
}
catch (Exception e)
{
    Console.WriteLine(e);
    throw;
}

app.Run();
