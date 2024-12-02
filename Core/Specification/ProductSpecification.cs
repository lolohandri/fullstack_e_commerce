using Core.Entities;
using Core.Enums;

namespace Core.Specification;

public class ProductSpecification : BaseSpecification<Product>
{
    public ProductSpecification(string? brand, string? type, ESorting? sort) : base(x =>
        (string.IsNullOrEmpty(brand) || x.Brand.ToLower().Equals(brand.ToLower())) &&
        (string.IsNullOrEmpty(type) || x.Type.ToLower().Equals(type.ToLower())))
    {
        switch (sort)
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