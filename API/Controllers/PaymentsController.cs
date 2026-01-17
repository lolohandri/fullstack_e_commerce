using Core.Entities.Cart;
using Core.Entities.Checkout;
using Core.Interfaces.Payments;
using Core.Interfaces.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class PaymentsController(
    IPaymentService paymentService,
    IGenericRepository<DeliveryMethod> deliveryMethodRepository) : BaseApiController
{
    [Authorize]
    [HttpPost("{cartId:guid}")]
    public async Task<ActionResult<ShoppingCart>> CreateOrUpdatePaymentIntent([FromRoute] Guid cartId)
    {
        var cart = await paymentService.CreateOrUpdatePaymentIntent(cartId);

        if (cart == null)
        {
            return BadRequest(new
            {
                message = "Unable to create payment intent"
            });
        }

        return Ok(cart);
    }

    [HttpGet("delivery-methods")]
    public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
    {
        return Ok(await deliveryMethodRepository.GetAllAsync());
    }
}