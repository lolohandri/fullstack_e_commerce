using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

#region Container

    builder.Services.AddControllers();
    builder.Services.AddDbContext<StoreContext>(opt =>
    {
        opt.UseNpgsql(builder.Configuration.GetConnectionString("StoreDatabase"));
    });
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowAll", policy =>
        {
            policy.AllowAnyOrigin()   // Allow any origin
                .AllowAnyMethod()   // Allow any HTTP method (GET, POST, etc.)
                .AllowAnyHeader();  // Allow any header
        });
    });
#endregion 


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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

app.Run();
