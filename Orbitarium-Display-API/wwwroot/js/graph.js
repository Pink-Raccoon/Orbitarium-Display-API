'use strict';

class Graph {
    constructor(height, width, color, rangeMin, rangeMax, title, unit = '', labels = [], currentValue = null) {
        this.height = height;
        this.width = width;
        this.color = color;
        this.max = rangeMax;
        this.min = rangeMin;
        this.title = title;
        this.id = this.generateId(title);
        this.graphValue = this.min;
        this.transformY = 0;
        this.unit = unit;
        this.labels = labels;
        this.currentValue = currentValue;        
    }
    
    set graphValue(newValue) {
        if (document.getElementById(this.id)) document.getElementById(`${this.id}-value`).innerHTML = `${newValue} ${this.unit}`;
        this.transformY = this.getPercentageFromBottom(newValue);
    }
    
    set transformY(newTransform) {
        if (document.getElementById(this.id)) document.getElementById(this.id).getElementsByClassName('graph-fill')[0].style.transform = `scaleY(${newTransform}%)`;
    }

    get style() {
        return `height: ${this.height}; width: ${this.width}`;
    }
    
    get labels() {
        return this._labels;
    }
    
    set labels(newValue) {
        this._labels = newValue;
        this.generateLabels()
    }
    
    get currentValue() {
        return this._currentValue;
    }
    
    set currentValue(newValue) {
        this._currentValue = newValue;
        this.generateLabels();
    }
    
    generateId(newTitle) {
        return newTitle.replace(/[^A-Z0-9]+/ig, "_").toLowerCase() + '-graph';
    }

    getPercentageFromBottom(currentNum) {
        return 100 * (currentNum- this.min) / (this.max - this.min);
    }

    getPercentageFromTop(currentNum) {
        return 100 - this.getPercentageFromBottom(currentNum);
    }

    generateLabels() {        
        const yLabels = this.labels.map( (label => `<li style="top: ${this.getPercentageFromTop(label)}%">${label} ${this.unit}</li>`));
        if(this.currentValue != null) {
            yLabels.push(`<li class="currentValue" style="top: ${this.getPercentageFromTop(this.currentValue)}%">${this.currentValue} ${this.unit}</li>`);
        }
        if(document.getElementById(this.id) != null) {
            document.getElementById(this.id).getElementsByClassName('graph-labels')[0].innerHTML = yLabels.join('');
        }
    }   

    render() {
        return `<span class="d-block t-center graph-value" id="${this.id}-value"></span>
                <div class='graph' style="${this.style}" id="${this.id}">
                    <ul class="graph-labels" style="height: ${this.height}"></ul>
                    <span class="graph-fill" style="background-color: ${this.color}; ${this.style}; transform: scaleY(0%)"></span>
                </div>
                <span class="graph-title">${this.title}</span>`;
    }
}