using Core.Entities;
using Core.Enums;
using Core.Interfaces;
using Core.Specification;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Tags("ProductAPI")]
[ApiController]
[Route("api/[controller]")]
public class ProductsController(IGenericRepository<Product> repository) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts([FromQuery]string? brand, [FromQuery]string? type, [FromQuery]ESorting? sort)
    {
        return Ok(await repository.GetAllAsync(new ProductSpecification(brand, type, sort)));
    }
    
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Product>> GetProduct(Guid id)
    {
        var product = await repository.GetByIdAsync(id);
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
        repository.Add(product);

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
        
        repository.Update(product);
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
        var productToDelete = await repository.GetByIdAsync(id);
        if (productToDelete == null)
        {
            return NotFound(new
            {
                message = $"Product with id = {id} was not found"
            });
        }
        
        repository.Remove(productToDelete);

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
        return Ok(await repository.GetAllAsync(new BrandListSpecification()));
    }
    
    [Tags("ProductAPI utils")]
    [HttpGet("types")]
    public async Task<ActionResult<IReadOnlyList<string>>> GetTypes()
    {
        return Ok(await repository.GetAllAsync(new TypeListSpecification()));
    }

    private bool ProductExists(Guid id)
    {
        return repository.Exist(id);
    }
}