using API.Middleware;
using Core.Entities.Users;
using Core.Interfaces.Repositories;
using Core.Interfaces.Services;
using Infrastructure.Data;
using Infrastructure.Data.Repositories;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

#region Container

    builder.Services.AddControllers();

    builder.Services.AddDbContext<StoreContext>(opt =>
    {
        opt.UseNpgsql(builder.Configuration.GetConnectionString("StoreDatabase"));
    });

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
    builder.Services.AddAuthorization();
    builder.Services
        .AddIdentityApiEndpoints<AppUser>()
        .AddEntityFrameworkStores<StoreContext>();
    
#endregion


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme."
    });

    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            []
        }
    });
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:4200", "https://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

var identityApi = app.MapGroup("api").MapIdentityApi<AppUser>();
identityApi.WithMetadata(new TagsAttribute("IdentityAPI"));

app.UseMiddleware<ExceptionMiddleware>();

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
