namespace Core.Entities.Cart;

public class ShoppingCart
{
    public required Guid Id { get; init; }

    public List<CartItem> CartItems { get; set; } = [];
    
    public Guid? DeliveryMethodId { get; set; }
    
    public string? ClientSecret { get; set; }
    
    public string? PaymentIntentId { get; set; }
}