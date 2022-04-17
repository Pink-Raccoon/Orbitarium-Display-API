using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Orbitarium_Display_API.Models
{
    public class DisplayData
    {
        [Key]
        [JsonIgnore]
        public int id { get; set; }
        public Int64 Population { get; set; }
        public Int64 PopulationUnderWater { get; set; }
        public float TemperatureC { get; set; }
        public float SeaLevel { get; set; }
        public int Co2ppm { get; set; }
        public int Year { get; set; }
    }
}