using AutoMapper;
using backend.Configuration.SQL;
using backend.Entities;
using backend.Models;

namespace backend.Logic;

public class ProductLogic(ReadWriteDbContext rwContext, IMapper mapper)
    : BaseLogic<Product, ProductModel>(rwContext, mapper);