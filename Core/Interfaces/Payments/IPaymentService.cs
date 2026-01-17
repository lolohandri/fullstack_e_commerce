using Core.Entities.Cart;

namespace Core.Interfaces.Payments;

public interface IPaymentService
{
    Task<ShoppingCart?> CreateOrUpdatePaymentIntent(Guid cartId);
}