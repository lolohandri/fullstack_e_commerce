using Core.Enums;

namespace Core.Specification.Product;

public class ProductSpecParams
{
    private const int MaxPageSize = 50;
    
    private int _pageSize = 10;
    private List<string> _types = [];
    private List<string> _brands = [];
    private string? _searchTerm;
    
    public int PageIndex { get; set; } = 1;
    
    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
    }
    
    public List<string> Brands
    {
        get => _brands;
        set
        {
            _brands = value.SelectMany(x => x.ToLower().Split(',', 
                StringSplitOptions.RemoveEmptyEntries)).ToList();
        }
    }
    
    public List<string> Types
    {
        get => _types;
        set
        {
            _types = value.SelectMany(x => x.ToLower().Split(',', 
                StringSplitOptions.RemoveEmptyEntries)).ToList();
        }
    }
    
    public ESorting? Sort { get; set; }

    public string SearchTerm
    {
        get => _searchTerm ?? "";
        set => _searchTerm = value.ToLower();
    }
}