namespace Core.Specification.Product;
using Entities;

public class BrandListSpecification : BaseSpecification<Entities.Products.Product, string>
{
    public BrandListSpecification()
    {
        AddSelect(x => x.Brand);
        ApplyDistinct();
    }
}