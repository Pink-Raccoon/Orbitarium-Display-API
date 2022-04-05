using Microsoft.AspNetCore.Mvc;
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
            return _context.DisplayDataSet.Last();
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
    /// <returns>Returns Accepted</returns>
    [HttpPost(Name = "PostTemperature")]
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
    [HttpGet]
    public IActionResult Index()
    {
        try
        {
            ViewBag.PopulationUnderWater = GetLast()?.PopulationUnderWater ?? 0;
            ViewBag.TemperatureC = GetLast()?.TemperatureC ?? 0;
            ViewBag.Year = GetLast()?.Year ?? 0;
            ViewBag.CO2ppm = GetLast()?.Co2ppm ?? 0;
            ViewBag.SeaLevel = GetLast()?.SeaLevel ?? 0;
            ViewBag.Valid = true;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
        return View();
    }

    [HttpGet(Name = "Website")]
    private DisplayData? GetLast()
    {
        try
        {
            return _context.DisplayDataSet.LastOrDefault();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return null;
        }
        
    }
}