'use strict';

const HEIGHT = '100%';
const WIDTH = '100%';
let updateInterval = 0;
let dataValid = false;
let co2, temperature , seaLevel, popUnderWater, yearDOMElement, errorDomElement;

document.addEventListener("DOMContentLoaded", function (event) {
    
    yearDOMElement = document.getElementById("year").getElementsByClassName('section-value')[0];
    
    co2 = new Graph(HEIGHT, WIDTH, "#ceffcf", 0, 1000, "CO2", 'ppm', [0,200, 400, 600, 800, 1000], 412.5);
    temperature = new Graph(HEIGHT, WIDTH, "#fffebb", 0, 40, "Global Mean Temperature", '°C', [0, 10, 20, 40], 13.9);
    seaLevel = new Graph(HEIGHT, WIDTH, "#b6cdff", -120, 80, "Sea Level", 'm', [-120, -60, 0, 80], 0.091);
    popUnderWater = new Graph(HEIGHT, WIDTH, "#ffb6fe", 0, 20, "Population Under Water", 'mil', [0,5,10,15,20], 10);
    
    document.getElementById("co2").insertAdjacentHTML("beforeend", co2.render());
    document.getElementById("temperature").insertAdjacentHTML("beforeend", temperature.render());
    document.getElementById("sealevel").insertAdjacentHTML("beforeend", seaLevel.render());
    document.getElementById("population-under-water").insertAdjacentHTML("beforeend", popUnderWater.render());
    
    co2.generateLabels();
    temperature.generateLabels();
    seaLevel.generateLabels();
    popUnderWater.generateLabels();

    updateInterval = setInterval(function () {
        fetchData();
    }, 1000)
        
});

window.addEventListener("beforeunload", function(e){
    clearInterval(updateInterval)
}, false);


function fetchData() {
    return fetch('/DisplayData/Get')
        .then((response) => {
            return response.json();
        })
        .then((displayData) => {            
            // console.log(displayData)

            yearDOMElement.innerHTML = `Year: ${displayData.year}`;            
            co2.graphValue = displayData.co2ppm;
            
            temperature.graphValue = displayData.temperatureC;
            seaLevel.graphValue = displayData.seaLevel;
            popUnderWater.graphValue = displayData.populationUnderWater;
            
            popUnderWater.max = displayData.population;
            /*
            TODO: Dynamic labels --> This code causes memory leak error        
            const popLabels = [0];
            for (let i = (displayData.population/5); i <= displayData.population; i += (displayData.population/5)) {
                popLabels.push(Math.round(i * 100) / 100);
            }            
            popUnderWater.labels = popLabels;
            */
            

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
        })
        .finally(() => {
            errorDomElement = document.getElementsByClassName('error')[0];
            if (dataValid) {
                errorDomElement.classList.remove('d-block');
                errorDomElement.classList.add('d-none');
            } else {
                errorDomElement.classList.remove('d-none');
                errorDomElement.classList.add('d-block');
            }
    });
}