using Core.Entities.Cart;
using Core.Entities.Checkout;
using Core.Interfaces.Payments;
using Core.Interfaces.Repositories;
using Core.Interfaces.Services;
using Microsoft.Extensions.Configuration;
using Stripe;
using Product = Core.Entities.Products.Product;

namespace Infrastructure.Services.Payments;

public class StripePaymentService(
    IConfiguration config,
    ICartService cartService,
    IGenericRepository<Product> productRepository,
    IGenericRepository<DeliveryMethod> deliveryMethodRepository) : IPaymentService
{
    public async Task<ShoppingCart?> CreateOrUpdatePaymentIntent(Guid cartId)
    {
        StripeConfiguration.ApiKey = config["StripeSettings:SecretKey"];

        var cart = await cartService.GetCartAsync(cartId);

        if (cart == null)
        {
            return null;
        }

        var shippingPrice = 0m;

        if (cart.DeliveryMethodId.HasValue)
        {
            var deliveryMethod = await deliveryMethodRepository.GetByIdAsync(cart.DeliveryMethodId.Value);

            if (deliveryMethod == null)
            {
                return null;
            }

            shippingPrice = deliveryMethod.Price;
        }

        foreach (var cartItem in cart.CartItems)
        {
            var productItem = await productRepository.GetByIdAsync(cartItem.ProductId);

            if (productItem == null)
            {
                return null;
            }

            if (cartItem.Price != productItem.Price)
            {
                cartItem.Price = productItem.Price;
            }
        }

        var service = new PaymentIntentService();

        if (string.IsNullOrEmpty(cart.PaymentIntentId))
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = (long)cart.CartItems.Sum(x => (x.Price * 100) * x.Quantity)
                         + (long)shippingPrice * 100,
                Currency = "usd",
                PaymentMethodTypes = ["card"]
            };

            var intent = await service.CreateAsync(options);

            cart.PaymentIntentId = intent.Id;
            cart.ClientSecret = intent.ClientSecret;
        }
        else
        {
            var options = new PaymentIntentUpdateOptions
            {
                Amount = (long)cart.CartItems.Sum(x => (x.Price * 100) * x.Quantity)
                         + (long)shippingPrice * 100
            };

            await service.UpdateAsync(cart.PaymentIntentId, options);
        }

        await cartService.SetCartAsync(cart);

        return cart;
    }
}