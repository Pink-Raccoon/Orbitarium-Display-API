'use strict';

class Graph {
    constructor(height, width, color, rangeMax, rangeMin) {
        this.height = height;
        this.width = width;
        this.color = color;
        this.max = rangeMax;
        this.min = rangeMin;
    }

    get style() {
        return `height: ${this.height}px; width: ${this.width}px`;
    }

    render() {
        return `<div class='graph' style="${this.style}">
            <span class="graph-fill" style="background-color: ${this.color}; ${this.style};"></span>
        </div>`;
    }
}