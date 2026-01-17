using Core.Entities.Cart;
using Core.Interfaces.Services;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace Infrastructure.Services;

public class CartService(IConnectionMultiplexer redis) : ICartService
{
    private readonly IDatabase _database = redis.GetDatabase();

    public async Task<ShoppingCart?> GetCartAsync(Guid cartId)
    {
        var data = await _database.StringGetAsync(cartId.ToString());

        return data.IsNullOrEmpty ? null : JsonConvert.DeserializeObject<ShoppingCart>(data);
    }

    public async Task<ShoppingCart?> SetCartAsync(ShoppingCart cart)
    {
        var created = await _database.StringSetAsync(cart.Id.ToString(),
            JsonConvert.SerializeObject(cart), TimeSpan.FromDays(7));

        if (!created) return null;

        return await GetCartAsync(cart.Id);
    }

    public Task<bool> RemoveCartAsync(Guid cartId)
    {
        return _database.KeyDeleteAsync(cartId.ToString());
    }
}