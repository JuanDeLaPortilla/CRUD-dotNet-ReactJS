using AutoMapper;
using backend.Configuration.SQL;
using backend.Entities.Interfaces;
using backend.Logic.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Logic;

public class BaseLogic<TEntity, TEntityModel>(ReadWriteDbContext rwContext, IMapper mapper)
    : IBaseLogic<TEntity, TEntityModel>
    where TEntity : class, IIdentifier
{
    public async Task<TEntityModel> GetByIdAsync(int id)
    {
        var entity = await rwContext
            .Set<TEntity>()
            .AsNoTracking()
            .FirstOrDefaultAsync(e => e.Id == id);

        if (entity == null) throw new ArgumentException($"La entidad con ID {id} no existe.", nameof(entity));

        return mapper.Map<TEntityModel>(entity);
    }

    public async Task<TEntityModel> AddAsync(TEntity entity)
    {
        await rwContext.AddAsync(entity);
        await rwContext.SaveChangesAsync();

        return mapper.Map<TEntityModel>(entity);
    }

    public async Task<TEntityModel> UpdateAsync(TEntity entity)
    {
        rwContext.Update(entity);
        await rwContext.SaveChangesAsync();

        return mapper.Map<TEntityModel>(entity);
    }

    public async Task DeleteAsync(int id)
    {
        var entity = await rwContext.Set<TEntity>().FindAsync(id);

        if (entity == null) throw new ArgumentException($"La entidad con ID {id} no existe.", nameof(id));

        rwContext.Remove(entity);
        await rwContext.SaveChangesAsync();
    }

    public async Task<List<TEntityModel>> ListAsync()
    {
        var entityList = await rwContext
            .Set<TEntity>()
            .AsNoTracking()
            .OrderBy(e => e.Id)
            .ToListAsync();

        return mapper.Map<List<TEntityModel>>(entityList);
    }
}