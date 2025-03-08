using System.Linq.Expressions;
using Core.Interfaces;
using Core.Interfaces.Features;

namespace Core.Specification;

public class BaseSpecification<T>(Expression<Func<T, bool>>? criteria) : ISpecification<T>
{
    protected BaseSpecification() : this(null){ }
    public Expression<Func<T, bool>>? Criteria => criteria;
    
    public Expression<Func<T, object>>? OrderBy { get; private set; }
    
    public Expression<Func<T, object>>? OrderByDesc { get; private set; }
    
    public bool IsDistinct { get; private set; }
    
    public int Take { get; private set; }
    
    public int Skip { get; private set; }
    
    public bool IsPaginated { get; private set; }
    
    public IQueryable<T> ApplyCriteria(IQueryable<T> query)
    {
        if (Criteria != null)
        {
            query = query.Where(Criteria);
        }

        return query;
    }

    protected void AddOrderBy(Expression<Func<T, object>> orderBy)
    {
        OrderBy = orderBy;
    }

    protected void AddOrderByDesc(Expression<Func<T, object>> orderByDesc)
    {
        OrderByDesc = orderByDesc;
    }

    protected void ApplyDistinct()
    {
        IsDistinct = true;
    }

    protected void ApplyPagination(int skip, int take)
    {
        Skip = skip;
        Take = take;
        IsPaginated = true;
    }
}

public class BaseSpecification<T, TResult>(Expression<Func<T, bool>>? criteria) : BaseSpecification<T>(criteria), ISpecification<T, TResult>
{
    protected BaseSpecification() : this(null){ }
    public Expression<Func<T, TResult>>? Select { get; private set; }

    protected void AddSelect(Expression<Func<T, TResult>> select)
    {
        Select = select;
    }
}