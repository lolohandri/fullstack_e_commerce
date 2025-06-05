namespace Core.Entities.Cart;

public class ShoppingCart
{
    public required Guid Id { get; init; }

    public List<CartItem> CartItems { get; set; } = [];
}