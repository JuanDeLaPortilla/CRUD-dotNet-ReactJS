using Microsoft.EntityFrameworkCore;
using Serilog;

namespace backend.Configuration.SQL
{
    public static class EntityRegister
    {
        private const string EntityRegInterface = "backend.Configuration.SQL.IEntityRegister";

        public static void LoadEntities(ModelBuilder modelBuilder)
        {
            var logger = Log.Logger;
            foreach (var assy in AppDomain.CurrentDomain.GetAssemblies())
            {
                try
                {
                    foreach (var t in assy.GetTypes())
                    {
                        var interfaces = t.FindInterfaces(
                            (t, filterCriteria) => t.ToString() == filterCriteria?.ToString(),
                            EntityRegInterface);

                        if (interfaces.Length > 0)
                        {
                            if (t.IsClass)
                            {
                                var entityRegistry = (IEntityRegister?)Activator.CreateInstance(t);

                                entityRegistry!.RegisterEntities(modelBuilder);
                            }
                        }

                        if (t.GetCustomAttributes(typeof(EntityAttribute), true)?.Length > 0)
                        {
                            modelBuilder.Entity(t);
                        }
                    }
                }
                catch (Exception ex)
                {
                    logger.Error(ex, $"Unable to load entity framework entity info from assembly {assy.FullName}");
                }
            }
        }
    }
}
