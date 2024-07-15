using backend.Configuration.SQL;
using backend.Constants;
using Microsoft.EntityFrameworkCore;

namespace backend.Entities;

public class ApiFluentConfig : IEntityRegister

{
    public DbContextOptionsBuilder ConfigureSqlServerOptions(DbContextOptionsBuilder options)
    {
        options.UseSqlServer(SQLConstants.DefaultConnectionString);

        return options;
    }

    public void RegisterEntities(ModelBuilder modelBuilder)
    {
        RegistryProductEntity(modelBuilder);
    }

    private static void RegistryProductEntity(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>()
            .Property(x => x.Id)
            .UseIdentityColumn();
    }
}