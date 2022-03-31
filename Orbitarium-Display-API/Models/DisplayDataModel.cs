using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Orbitarium_Display_API.Models
{
    public class DisplayData
    {
        [Key]
        public int id { get; set; }
        public Int64 PopulationUnderWater { get; set; }
        public float TemperatureC { get; set; }
        //public float TemperatureF => 32 + (int) (TemperatureC / 0.5556);
        public float SeaLevel { get; set; }
        public int CO2ppm { get; set; }
        public int Year { get; set; }
    }
}