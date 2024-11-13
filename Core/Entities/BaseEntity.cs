using System.ComponentModel.DataAnnotations;

namespace Core.Entities;

public class BaseEntity
{
    [Required]
    public Guid Id { get; set; }
}