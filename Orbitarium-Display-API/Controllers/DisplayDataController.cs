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
    /// Reads newest display data
    /// </summary>
    /// <response code="200">Returns the newest DisplayData</response>
    /// <response code="204">Returns empty 204</response>
    [HttpGet(Name = "GetDisplayData")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public ActionResult<DisplayData?> Get()
    {
        try
        {
            return _context.Last();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return NoContent();
        }
    }
    
    /// <summary>
    /// Writes display data
    /// </summary>
    /// <param name="data"></param>
    /// <returns>Returns the saved DisplayData</returns>
    /// <remarks>
    /// Sample request:
    ///
    ///     POST /DisplayData/Post
    ///     {
    ///         "Population":7795,
    ///         "PopulationUnderWater":10,
    ///         "TemperatureC":14.0,
    ///         "SeaLevel":0.0,
    ///         "Co2ppm":280,
    ///         "Year":1870
    ///     }
    ///
    /// </remarks>
    /// <response code="201">Returns the saved DisplayData</response>
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
    /// <response code="200">Returns the DisplayData webpage</response>
    [HttpGet]
    [Route("/[controller]/")]
    public ViewResult Index()
    {
        return View();
    }
}