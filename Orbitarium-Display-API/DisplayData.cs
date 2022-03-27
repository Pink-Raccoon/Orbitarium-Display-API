using System.Numerics;

namespace Orbitarium_Display_API;

public class DisplayData
{
    public DisplayData(Int64 populationUnderWater, float temperatureC, float seaLevel, int co2Ppm, int year)
    {
        this.PopulationUnderWater = populationUnderWater;
        this.TemperatureC = temperatureC;
        this.SeaLevel = seaLevel;
        this.CO2ppm = co2Ppm;
        this.Year = year;

    }
    public DisplayData()
    {
        this.PopulationUnderWater = 0;
        this.TemperatureC = 0;
        this.SeaLevel = 0;
        this.CO2ppm = 0;
        this.Year = 0;

    }
    public Int64 PopulationUnderWater { get; set; }

    public float TemperatureC { get; set; }

    public float TemperatureF => 32 + (int) (TemperatureC / 0.5556);

    public float SeaLevel { get; set; }
    public int CO2ppm { get; set; }
    public int Year { get; set; }
}