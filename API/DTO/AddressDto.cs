using System.ComponentModel.DataAnnotations;

namespace API.DTO;

public class AddressDto
{
    [Required]
    public string Line1 { get; set; }
    
    public string? Line2 { get; set; }
    
    [Required]
    public string City { get; set; }
    
    [Required]
    public string State { get; set; }
    
    [Required]
    public string Postcode { get; set; }
    
    [Required]
    public string Country { get; set; }
}