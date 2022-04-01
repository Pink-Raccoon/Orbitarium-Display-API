'use strict';

// TODO: graphValue somehow is write-only??
class Graph {
    constructor(height, width, color, rangeMin, rangeMax, title) {
        this.height = height;
        this.width = width;
        this.color = color;
        this.max = rangeMax;
        this.min = rangeMin;
        this.title = title;
        this.id = this.generateId(title);
        this.graphValue = this.min;
        this.transformY = 0;
    }

    get style() {
        return `height: ${this.height}; width: ${this.width}`;
    }
    
    generateId(newTitle) {
        return newTitle.replace(/[^A-Z0-9]+/ig, "_").toLowerCase() + '-graph';
    }

    mapBetween(currentNum, minAllowed, maxAllowed, min, max) {
        return (maxAllowed - minAllowed) * (currentNum- min) / (max - min) + minAllowed;
    }

    set graphValue(newValue) {
        if (document.getElementById(this.id)) document.getElementById(this.id).getElementsByClassName('graph-value')[0].innerHTML = newValue;
        this.transformY = this.mapBetween(newValue,0,100,this.min,this.max)
    }
    
    set transformY(newTransform) {
        if (document.getElementById(this.id)) document.getElementById(this.id).getElementsByClassName('graph-fill')[0].style.transform = `scaleY(${newTransform}%)`;
    }

    render() {
        return `<div class='graph' style="${this.style}" id="${this.id}">
                    <span class="d-block section-value t-center graph-value"></span>
                    <span class="graph-fill" style="background-color: ${this.color}; ${this.style}; transform: scaleY(0%)"></span>
                </div>
                <span class="graph-title">${this.title}</span>`;
    }
}