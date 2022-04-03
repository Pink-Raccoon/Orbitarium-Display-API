'use strict';

const HEIGHT = '100%';
const WIDTH = '100%';

document.addEventListener("DOMContentLoaded", function (event) {
    
    let dataValid = false;
    
    let yearDOMElement = document.getElementById("year").getElementsByClassName('section-value')[0];
    
    const co2 = new Graph(HEIGHT, WIDTH, "#ceffcf", 0, 1000, "CO2", 'ppm', [0,200, 400, 600, 800, 1000]);
    const temperature = new Graph(HEIGHT, WIDTH, "#fffebb", 0, 30, "Global Mean Temperature", '°C', [0, 10, 20, 30]);
    const seaLevel = new Graph(HEIGHT, WIDTH, "#b6cdff", -120, 80, "Sea Level", 'm', [-120, -60, 0, 80]);
    const popUnderWater = new Graph(HEIGHT, WIDTH, "#ffb6fe", 0, 20000, "Population Under Water", '', [0, 5000, 10000,15000,20000]);
    
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
                yearDOMElement.innerHTML = `Year: ${displayData.year}`;
                co2.graphValue = displayData.co2ppm;
                temperature.graphValue = displayData.temperatureC;
                seaLevel.graphValue = displayData.seaLevel;
                popUnderWater.graphValue = displayData.populationUnderWater;
                dataValid = true;
            })
            .catch(error => {
                console.error(error);
                dataValid = false;

                yearDOMElement.innerHTML = "Year: 0";
                co2.graphValue = 0;
                temperature.graphValue = 0;
                seaLevel.graphValue = 0;
                popUnderWater.graphValue = 0;
            }).finally(() => {
                const errorDomElement = document.getElementsByClassName('error')[0];
                if (dataValid) {
                    errorDomElement.classList.remove('d-block');
                    errorDomElement.classList.add('d-none');                    
                } else {
                    errorDomElement.classList.remove('d-none');
                    errorDomElement.classList.add('d-block');
                }
            });
    }, 1000);
    
    

});