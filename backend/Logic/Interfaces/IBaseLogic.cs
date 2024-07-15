using backend.Entities.Interfaces;

namespace backend.Logic.Interfaces;

public interface IBaseLogic<TEntity, TEntityModel>
    where TEntity : class, IIdentifier
{
    Task<TEntityModel> GetByIdAsync(int id);
    Task<TEntityModel> AddAsync(TEntity entity);
    Task<TEntityModel> UpdateAsync(TEntity entity);
    Task DeleteAsync(int id);
    Task<List<TEntityModel>> ListAsync();
}