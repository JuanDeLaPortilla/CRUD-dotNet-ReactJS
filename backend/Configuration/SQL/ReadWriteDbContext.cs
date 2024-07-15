using backend.Constants;
using Serilog;
using Microsoft.EntityFrameworkCore;

namespace backend.Configuration.SQL
{
    public class ReadWriteDbContext() : BaseDbContext(SQLConstants.ReadWriteConnectionString)
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            try
            {
                ConfigureDbContext(optionsBuilder);
            }
            catch (Exception ex)
            {
                Log.Logger.Error(ex, "Configuration of ReadWrite database context in EF provider failed");
                throw;
            }
        }
    }
}
