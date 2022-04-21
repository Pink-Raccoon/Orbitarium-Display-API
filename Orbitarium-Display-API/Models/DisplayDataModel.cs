using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace Orbitarium_Display_API.Models
{
    public class DisplayData
    {
        [Key] [JsonIgnore] public int id { get; set; }

        /// <summary>
        /// Max. Population
        /// </summary>
        public Int64 Population { get; set; }
        /// <summary>
        /// Population below sea level
        /// </summary>
        public Int64 PopulationUnderWater { get; set; }
        /// <summary>
        /// Current temperature in Celsius
        /// </summary>
        public float TemperatureC { get; set; }
        /// <summary>
        /// Current sea level
        /// </summary>
        public float SeaLevel { get; set; }
        /// <summary>
        /// Current CO2 ppm
        /// </summary>
        public int Co2ppm { get; set; }
        /// <summary>
        /// Current year
        /// </summary>
        public int Year { get; set; }
    }
}