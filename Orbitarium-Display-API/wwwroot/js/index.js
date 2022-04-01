const HEIGHT = '500px';
const WIDTH = '100%';

document.addEventListener("DOMContentLoaded", function (event) {
    
    let year = 0;
    const co2 = new Graph(HEIGHT, WIDTH, "#ceffcf", 0, 1000, "CO2");
    const temperature = new Graph(HEIGHT, WIDTH, "#fffebb", -50, 70, "avg. Temperature");
    const seaLevel = new Graph(HEIGHT, WIDTH, "#b6cdff", -500, 500, "Sea Level");
    const popUnderWater = new Graph(HEIGHT, WIDTH, "#ffb6fe", 0, 20000, "Pop. under Water");
    
    document.getElementById("co2").insertAdjacentHTML("beforeend", co2.render());
    document.getElementById("temperature").insertAdjacentHTML("beforeend", temperature.render());
    document.getElementById("sealevel").insertAdjacentHTML("beforeend", seaLevel.render());
    document.getElementById("population-under-water").insertAdjacentHTML("beforeend", popUnderWater.render());
    
    setInterval(() => {
        fetch('/DisplayData/Get')
            .then((response) => {
                return response.json();
            })
            .then((displayData) => {
                console.log(displayData);
                co2.graphValue = displayData.co2ppm;
                temperature.graphValue = displayData.temperatureC;
                seaLevel.graphValue = displayData.seaLevel;
                popUnderWater.graphValue = displayData.populationUnderWater;
            });
    }, 1000)

});