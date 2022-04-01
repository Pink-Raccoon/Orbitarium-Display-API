const HEIGHT = 500;
const WIDTH = 300;

document.addEventListener("DOMContentLoaded", function (event) {

    const co2 = new Graph(HEIGHT, WIDTH, "red", );
    const temperature = new Graph(HEIGHT, WIDTH, "green");
    const sealevel = new Graph(HEIGHT, WIDTH, "blue");
    const popUnderWater = new Graph(HEIGHT, WIDTH, "yellow");
    
    document.getElementById("co2").insertAdjacentHTML("beforeend", co2.render());
    document.getElementById("temperature").insertAdjacentHTML("beforeend", temperature.render());
    document.getElementById("sealevel").insertAdjacentHTML("beforeend", sealevel.render());
    document.getElementById("population-under-water").insertAdjacentHTML("beforeend", popUnderWater.render());

});