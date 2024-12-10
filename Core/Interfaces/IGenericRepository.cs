using Core.Entities;

namespace Core.Interfaces;

public interface IGenericRepository<T> where T : BaseEntity
{
    Task<T?> GetByIdAsync(Guid id);
    Task<IReadOnlyList<T>> GetAllAsync();
    Task<T?> GetEntityWithSpec(ISpecification<T> spec);
    Task<IReadOnlyList<T>> GetAllAsync(ISpecification<T> spec);
    Task<TResult?> GetEntityWithSpec<TResult>(ISpecification<T, TResult> spec);
    Task<IReadOnlyList<TResult>> GetAllAsync<TResult>(ISpecification<T, TResult> spec);
    
    void Add(T entity);
    void Update(T entity);
    void Remove(T entity);
    bool Exist(Guid id);
    
    Task<bool> SaveChangesAsync();
    Task<int> CountAsync(ISpecification<T> spec);
}