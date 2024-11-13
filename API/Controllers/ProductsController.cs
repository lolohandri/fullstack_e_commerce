using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(StoreContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    {
        return await context.Products.ToListAsync();
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Product>> GetProduct(Guid id)
    {
        var product = await context.Products.FindAsync(id);
        if (product == null)
        {
            return NotFound();
        }
        return product;
    }

    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct([FromBody]Product product)
    {
        await context.Products.AddAsync(product);
        await context.SaveChangesAsync();

        return product;
    }

    [HttpPost("/createProducts")]
    public async Task<ActionResult<IEnumerable<Product>>> CreateProducts([FromBody]IEnumerable<Product> products)
    {
        var productsList = products.ToList();
        await context.Products.AddRangeAsync(productsList);
        await context.SaveChangesAsync();

        return productsList.ToList();
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult> UpdateProduct(Guid id, [FromBody] Product product)
    {
        if (!ProductExists(id) || product.Id != id)
        {
            return BadRequest("Cannot update product, because product does not exist");
        }
        context.Entry(product).State = EntityState.Modified;
        await context.SaveChangesAsync();

        return Ok(new
        {
            message = $"Product with id = {product.Id} was updated"
        });
    }

    [HttpDelete("{id:guid}")]
    public async Task<ActionResult> DeleteProduct(Guid id)
    {
        var productToDelete = await context.Products.FindAsync(id);
        if (productToDelete == null)
        {
            return NotFound();
        }
        context.Products.Remove(productToDelete);
        await context.SaveChangesAsync();
        
        return Ok(new
        {
            message = $"Product with id = {id} was deleted"
        });
    }

    private bool ProductExists(Guid id)
    {
        return context.Products.Any(e => e.Id == id);
    }
}