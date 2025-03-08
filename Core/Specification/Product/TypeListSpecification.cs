namespace Core.Specification.Product;
using Entities;

public class TypeListSpecification : BaseSpecification<Entities.Products.Product, string>
{
    public TypeListSpecification()
    {
        AddSelect(x => x.Type);
        ApplyDistinct();
    }
}