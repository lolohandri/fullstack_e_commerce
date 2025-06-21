using API.DTO;
using API.Extensions;
using Core.Entities.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Tags("AccountAPI")]
public class AccountController(SignInManager<AppUser> signInManager) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDto registerDto)
    {
        var user = new AppUser
        {
            FirstName = registerDto.FirstName,
            LastName = registerDto.LastName,
            UserName = registerDto.Email, 
            Email = registerDto.Email
        };
        
        var result = await signInManager.UserManager.CreateAsync(user, registerDto.Password);

        if (result.Succeeded) return Ok();
        
        foreach (var error in  result.Errors)
        {
            ModelState.AddModelError(error.Code, error.Description);
        }
            
        return ValidationProblem(ModelState);
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        await signInManager.SignOutAsync();
        
        return NoContent();
    }
    
    [HttpGet("getUserInfo")]
    public async Task<IActionResult> GetUserInfo()
    {
        if (User.Identity?.IsAuthenticated == false)
        {
            return Unauthorized(new
            {
                messsage = "Authorization is required"
            });
        }

        var user = await signInManager.UserManager.GetUserWithAddressByEmailAsync(User);

        return Ok(new
        {
            user.FirstName,
            user.LastName,
            user.Email,
            Address = user.Address.ToDto()
        });
    }

    [HttpGet("getAuthState")]
    public ActionResult GetAuthenticationState()
    {
        return Ok(new
        {
            isAuthenticated = User.Identity?.IsAuthenticated ?? false
        });
    }

    [Authorize]
    [HttpPost("address")]
    public async Task<ActionResult<Address>> CreateOrUpdateAddress(AddressDto addressDto)
    {
        var user = await signInManager.UserManager.GetUserWithAddressByEmailAsync(User);

        if (user.Address == null)
        {
            user.Address = addressDto.ToEntity();
        }
        else
        {
            user.Address.UpdateFromDto(addressDto);
        }
        
        var result = await signInManager.UserManager.UpdateAsync(user);

        if (!result.Succeeded)
        {
            return BadRequest(new
            {
                messsage = $"Updating user address failed; {result.Errors.Select(e => e.Description)}"
            });
        }

        return Ok(user.Address.ToDto());
    }
}