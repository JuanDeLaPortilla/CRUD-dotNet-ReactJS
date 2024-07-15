using backend.Controllers.BaseClasses;
using backend.Entities;
using backend.Logic.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController(IBaseLogic<Product, ProductModel> logic) 
    : BaseController<Product, ProductModel>(logic);