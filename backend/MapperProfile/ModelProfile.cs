using AutoMapper;
using backend.Entities;
using backend.Models;

namespace backend.MapperProfile;

public class ModelProfile : Profile
{
    public ModelProfile()
    {
        CreateMap<Product, ProductModel>()
            .ReverseMap();
    }
}