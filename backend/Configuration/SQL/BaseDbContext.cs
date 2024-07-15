using System.Reflection;
using backend.Constants;
using Microsoft.EntityFrameworkCore;

namespace backend.Configuration.SQL
{
    public class BaseDbContext : DbContext
    {
        private readonly string _contextType;
        private static readonly ILoggerFactory MyLoggerFactory
            = LoggerFactory.Create(builder => { builder.AddConsole(); });

        public BaseDbContext(string contextType)
            : base()
        {
            _contextType = contextType;
        }

        public BaseDbContext(DbContextOptions options, string contextType)
          : base(options)
        {
            _contextType = contextType;
        }

        #region Protected Methods

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            EntityRegister.LoadEntities(modelBuilder);
        }

        protected void ConfigureDbContext(DbContextOptionsBuilder optionsBuilder)
        {
            string connStr = Environment
                .GetEnvironmentVariable(_contextType) ??
                SQLConstants.DefaultConnectionString;

            optionsBuilder
                .UseSqlServer(connStr, b => b.MigrationsAssembly(Assembly.GetExecutingAssembly().FullName))
                .UseLoggerFactory(MyLoggerFactory);
        }

        #endregion Protected Methods
    }
}
