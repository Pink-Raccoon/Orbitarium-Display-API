using Microsoft.AspNetCore.Mvc;

namespace Orbitarium_Display_API.Controllers;

[ApiController]
[Route("[controller]")]
public class DisplayDataController : ControllerBase
{
    private DisplayData displayData = new DisplayData();
 
    private readonly ILogger<DisplayDataController> _logger;

    public DisplayDataController(ILogger<DisplayDataController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetDisplayData")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public DisplayData Get()
    {
        DisplayData d = new DisplayData(500, 500, 500, 500, 500);
        return displayData;
    }
    
    
    [HttpPost(Name = "PostTemperature")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult Post(DisplayData data)
    {
        displayData.Year = 500;
        return Accepted();
    }
}