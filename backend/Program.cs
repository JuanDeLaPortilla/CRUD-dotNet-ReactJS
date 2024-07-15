using backend;
using backend.Configuration.SQL;
using backend.Constants;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    const string serviceName = "CRUD dotNet Reactjs";
    const string? version = "v1";
    const string? description = "CRUD dotNet Reactjs Services";

    c.SwaggerDoc(version, new OpenApiInfo { Title = serviceName, Version = version, Description = description });
    c.CustomSchemaIds(x => x.FullName);
});

builder.Services.AddAutoMapper(typeof(Program).Assembly);

if (Environment.GetEnvironmentVariable(SQLConstants.ReadWriteConnectionString) == null)
    Environment.SetEnvironmentVariable(
        SQLConstants.ReadWriteConnectionString,
        builder.Configuration.GetConnectionString(SQLConstants.ReadWriteConnectionString) ??
        SQLConstants.DefaultConnectionString);

builder.Services.AddDbContext<ReadWriteDbContext>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowAnyOrigin()
    );
});

Registration.Register(builder.Services);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "CrudDotNetReactJs");
    });
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.UseCors();

app.UseEndpoints(endpoints => { _ = endpoints.MapControllers(); });

app.Run();