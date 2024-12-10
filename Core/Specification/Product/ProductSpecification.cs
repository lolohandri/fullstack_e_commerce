namespace Core.Specification.Product;

using Enums;

public class ProductSpecification : BaseSpecification<Entities.Product>
{
    public ProductSpecification(ProductSpecParams specParams) : base(x =>
        (string.IsNullOrEmpty(specParams.SearchTerm) ||
         x.Name.ToLower().Contains(specParams.SearchTerm) ||
         x.Type.ToLower().Contains(specParams.SearchTerm) ||
         x.Brand.ToLower().Contains(specParams.SearchTerm)) &&
        (specParams.Brands.Count == 0 || specParams.Brands.Contains(x.Brand.ToLower())) &&
        (specParams.Types.Count == 0 || specParams.Types.Contains(x.Type.ToLower())))
    {
        ApplyPagination(specParams.PageSize * (specParams.PageIndex - 1), specParams.PageSize);
        
        switch (specParams.Sort)
        {
            case ESorting.PriceAscending:
                AddOrderBy(x => x.Price);
                break;
            case ESorting.PriceDescending:
                AddOrderByDesc(x => x.Price);
                break;
            default:
                AddOrderBy(x => x.Name);
                break;
        }
    }
}