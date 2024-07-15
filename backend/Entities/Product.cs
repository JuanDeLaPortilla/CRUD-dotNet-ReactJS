using backend.Entities.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Entities;

public class Product : IIdentifier
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    [Precision(10, 2)] public decimal Price { get; set; }
}