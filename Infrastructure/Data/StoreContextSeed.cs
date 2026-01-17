using Core.Entities.Checkout;
using Core.Entities.Products;
using Newtonsoft.Json;

namespace Infrastructure.Data;

public static class StoreContextSeed
{
    public static async Task SeedAsync(StoreContext context)
    {
        if (!context.Products.Any())
        {
            var path = Path.Combine(AppContext.BaseDirectory, "Infrastructure", "SeedData", "products.json");

            var productsData = await File.ReadAllTextAsync(path);

            var products = JsonConvert.DeserializeObject<List<Product>>(productsData);

            if (products == null) return;

            context.Products.AddRange(products);
            await context.SaveChangesAsync();
        }

        if (!context.DeliveryMethods.Any())
        {
            var path = Path.Combine(AppContext.BaseDirectory, "Infrastructure", "SeedData", "delivery.json");

            var deliveryMethodsData = await File.ReadAllTextAsync(path);

            var deliveryMethods = JsonConvert.DeserializeObject<List<DeliveryMethod>>(deliveryMethodsData);

            if (deliveryMethods == null) return;

            context.DeliveryMethods.AddRange(deliveryMethods);
            await context.SaveChangesAsync();
        }
    }
}