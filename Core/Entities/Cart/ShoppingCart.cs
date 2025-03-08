namespace Core.Entities.Cart;

public class ShoppingCart
{
    public long Id { get; init; }

    public List<CartItem> CartItems { get; set; } = [];
}