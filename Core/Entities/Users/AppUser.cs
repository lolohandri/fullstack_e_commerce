using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Users;

public class AppUser : IdentityUser
{
    public string? FirstName { get; set; }
    
    public string? LastName { get; set; }

    public Address? Address { get; set; }
}