﻿namespace Core.Entities.Users;

public class Address : BaseEntity
{
    public required string Line1 { get; set; }
    
    public string? Line2 { get; set; }
    
    public required string City { get; set; }
    
    public required string State { get; set; }
    
    public required string Postcode { get; set; }
    
    public required string Country { get; set; }
}