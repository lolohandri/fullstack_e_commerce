using Core.Entities.Cart;

namespace Core.Interfaces.Services;

public interface ICartService
{
    Task<ShoppingCart?> GetCartAsync(Guid cartId);
    
    Task<ShoppingCart?> SetCartAsync(ShoppingCart cart);
    
    Task<bool> RemoveCartAsync(Guid cartId);
}