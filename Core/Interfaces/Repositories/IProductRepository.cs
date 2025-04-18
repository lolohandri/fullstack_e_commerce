using Core.Entities.Products;

namespace Core.Interfaces.Repositories;

public interface IProductRepository
{
    Task<IReadOnlyList<Product>> GetProductsAsync(string? brand, string? type, string? sort);
    
    Task<Product?> GetProductByIdAsync(Guid productId);

    Task<IReadOnlyList<string>> GetBrandsAsync();
    
    Task<IReadOnlyList<string>> GetTypesAsync();
    
    void AddProduct(Product product);

    void UpdateProduct(Product product);
    
    void DeleteProduct(Product product);
    
    bool ProductExists(Guid productId);
    
    Task<bool> SaveChangesAsync();
}