using Core.Entities;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Infrastructure.Data;

public class StoreContextSeed
{
    public static async Task SeedAsync(StoreContext context)
    {
        if (!context.Products.Any())
        {
            var productsData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/products.json");
            
            var products = JsonConvert.DeserializeObject<List<Product>>(productsData);
            
            if(products == null) return;
            
            context.Products.AddRange(products);
            await context.SaveChangesAsync();
        }
    }
}