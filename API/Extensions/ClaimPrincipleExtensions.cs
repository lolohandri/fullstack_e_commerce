using System.Security.Authentication;
using System.Security.Claims;
using Core.Entities.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class ClaimPrincipleExtensions
{
    public static async Task<AppUser> GetUserByEmailAsync(this UserManager<AppUser> userManager,
        ClaimsPrincipal user)
    {
        var userToReturn = await userManager.Users.FirstOrDefaultAsync(u => u.Email == user.GetEmail());

        if (userToReturn == null)
        {
            throw new ApplicationException("User not found");
        }
        
        return userToReturn;
    }
    
    public static async Task<AppUser> GetUserWithAddressByEmailAsync(this UserManager<AppUser> userManager,
        ClaimsPrincipal user)
    {
        var userToReturn = await userManager.Users
            .Include(u => u.Address)
            .FirstOrDefaultAsync(u => u.Email == user.GetEmail());

        if (userToReturn == null)
        {
            throw new ApplicationException("User not found");
        }
        
        return userToReturn;
    }

    public static string GetEmail(this ClaimsPrincipal user)
    {
        var email = user.FindFirstValue(ClaimTypes.Email) 
                    ?? throw new AuthenticationException("Email claim is not present in claims principal");
        
        return email;
    }
}