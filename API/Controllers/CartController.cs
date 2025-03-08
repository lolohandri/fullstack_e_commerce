using Core.Entities.Cart;
using Core.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class CartController(ICartService cartService) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<ShoppingCart>> GetCartById(int cartId)
    {
        var cart = await cartService.GetCartAsync(cartId);
        
        return Ok(cart ?? new ShoppingCart{Id = cartId});
    }

    [HttpPost]
    public async Task<ActionResult<ShoppingCart>> UpdateCart(ShoppingCart cart)
    {
        var updatedCart = await cartService.SetCartAsync(cart);

        if (updatedCart == null)
        {
            return BadRequest("Could not update cart.");
        }
        return updatedCart;
    }

    [HttpDelete]
    public async Task<ActionResult> DeleteCart(Guid cartId)
    {
        var isDeleted = await cartService.RemoveCartAsync(cartId);

        if (!isDeleted)
        {
            return BadRequest("Could not delete cart.");
        }
        
        return Ok($"Cart with id = {cartId:P} deleted");
    }
}