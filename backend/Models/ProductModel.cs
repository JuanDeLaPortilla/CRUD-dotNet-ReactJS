using backend.Entities.Interfaces;

namespace backend.Models;

public class ProductModel : IIdentifier
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
}