using backend.Entities;
using backend.Logic;
using backend.Logic.Interfaces;
using backend.Models;

namespace backend;

public static class Registration
{
    public static void Register(IServiceCollection services)
    {
        services.AddScoped<IBaseLogic<Product, ProductModel>, ProductLogic>();
    }
}