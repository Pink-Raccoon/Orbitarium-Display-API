using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol;
using Orbitarium_Display_API.Models;

namespace Orbitarium_Display_API.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class DisplayDataController : Controller
{
    private readonly ILogger<DisplayDataController> _logger;
    private DisplayDataContext _context;

    public DisplayDataController(ILogger<DisplayDataController> logger, DisplayDataContext context)
    {
        _logger = logger;
        _context = context;
    }

    
    /// <summary>
    /// Reads display data
    /// </summary>
    [HttpGet(Name = "GetDisplayData")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public DisplayData? Get()
    {
        try
        {
            Console.WriteLine(_context.Last().ToJson());
            return _context.Last();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return null;
        }
    }
    
    /// <summary>
    /// Writes display data
    /// </summary>
    /// <param name="data"></param>
    /// <returns>Returns the saved DisplayData</returns>
    [HttpPost(Name = "PostDisplayData")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public async Task<IActionResult> Post(DisplayData data)
    {
        _context.DisplayDataSet.Add(data);
        await _context.SaveChangesAsync();
        return Accepted(data);
    }
    
    /// <summary>
    /// Gets the website
    /// </summary>
    /// <returns>Returns the index page</returns>
    [HttpGet]
    [Route("/[controller]/")]
    public ViewResult Index()
    {
        return View();
    }
}