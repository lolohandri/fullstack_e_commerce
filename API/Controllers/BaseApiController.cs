using API.RequestHelpers;
using Core.Entities;
using Core.Interfaces;
using Core.Interfaces.Features;
using Core.Interfaces.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BaseApiController : ControllerBase
{
    protected async Task<ActionResult> CreatePagedResult<T>(IGenericRepository<T> repository, ISpecification<T> spec,
        int pageIndex = 1, int pageSize = 10) where T : BaseEntity
    {
        var items = await repository.GetAllAsync(spec);
        var count = await repository.CountAsync(spec);
        
        var pagination = new Pagination<T>(
            pageIndex, 
            pageSize,
            count, 
            items);
        return Ok(pagination);
    }
}