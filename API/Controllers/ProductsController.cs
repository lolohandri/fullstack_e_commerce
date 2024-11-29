using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Tags("ProductAPI")]
[ApiController]
[Route("api/[controller]")]
public class ProductsController(IProductRepository repository) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts([FromQuery]string? brand, [FromQuery]string? type, [FromQuery]string? sort)
    {
        return Ok(await repository.GetProductsAsync(brand, type, sort));
    }
    
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Product>> GetProduct(Guid id)
    {
        var product = await repository.GetProductByIdAsync(id);
        if (product == null)
        {
            return NotFound(new
            {
                message = $"Product with id = {id} not found",
            });
        }
        return product;
    }
    
    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct([FromBody]Product product)
    {
        repository.AddProduct(product);

        if (await repository.SaveChangesAsync())
        {
            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        return BadRequest(new
        {
            message = "Unable to create product"
        });
    }
    
    [HttpPut("{id:guid}")]
    public async Task<ActionResult> UpdateProduct(Guid id, [FromBody] Product product)
    {
        if (!ProductExists(id) || product.Id != id)
        {
            return BadRequest(new
            {
                message = "Cannot update product, because product does not exist"
            });
        }
        
        repository.UpdateProduct(product);
        if (await repository.SaveChangesAsync())
        {
            return Ok(new
            {
                message = $"Product with id = {product.Id} was updated"
            });
        }

        return BadRequest(new
        {
            message = "Unable to update product"
        });
    }
    
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult> DeleteProduct(Guid id)
    {
        var productToDelete = await repository.GetProductByIdAsync(id);
        if (productToDelete == null)
        {
            return NotFound(new
            {
                message = $"Product with id = {id} was not found"
            });
        }
        
        repository.DeleteProduct(productToDelete);

        if (await repository.SaveChangesAsync())
        {
            return Ok(new
            {
                message = $"Product with id = {id} was deleted"
            });
        }
        
        return BadRequest(new
        {
            message = "Unable to delete product"
        });
    }

    [Tags("ProductAPI utils")]
    [HttpGet("brands")]
    public async Task<ActionResult<IReadOnlyList<string>>> GetBrands()
    {
        return Ok(await repository.GetBrandsAsync());
    }
    
    [Tags("ProductAPI utils")]
    [HttpGet("types")]
    public async Task<ActionResult<IReadOnlyList<string>>> GetTypes()
    {
        return Ok(await repository.GetTypesAsync());
    }

    private bool ProductExists(Guid id)
    {
        return repository.ProductExists(id);
    }
}