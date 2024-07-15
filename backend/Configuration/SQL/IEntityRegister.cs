using Microsoft.EntityFrameworkCore;

namespace backend.Configuration.SQL
{
    public interface IEntityRegister
    {
        void RegisterEntities(ModelBuilder modelBuilder);

        DbContextOptionsBuilder ConfigureSqlServerOptions(DbContextOptionsBuilder options);
    }
}
