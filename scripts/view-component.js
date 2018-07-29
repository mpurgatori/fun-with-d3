/**
 * @module view-component
 * @description View component that renders an individual meter chart via the d3 library
 * @since 1.0.0
 * @requires d3
 */

const d3 = require("d3");


/**
* @function degreeCalc
* @description Helper function for calculating arc start and end points based on a 360 degree circle
* @param {number} degree number corresponding to a degree on a circle
* @returns {number} Radian that corresponds to a point on a d3 arc
* @since 1.0.0
*/
const degreeCalc = (degree)=> {
    if (typeof degree !== "number")
        return false      
    return degree * Math.PI / 180.0;
};
    
/**
* @function createCirclePointPaths
* @description Creates an array of four d3 arc generators used to draw paths for points on meter inner circle
* @returns {array} array or arc paths
* @since 1.0.0
*/
const createCirclePointPaths = () => {
    let dotArcs = [];
    let start = -1;
    let end = 1;
    for (let i=0; i<4; i++)
    {
        dotArcs[i] = d3.arc()
        .startAngle(degreeCalc(start))
        .endAngle(degreeCalc(end))
        .innerRadius(70)
        .outerRadius(73);
        start += 90;
        end += 90;
    }
    return dotArcs
};

 /**
* @function creatCirclePoints
* @description appends circle point paths and adds corresponding meter color
* @param {object} meter d3 svg canvas object
* @param {string} color hex color representing main arc color
* @since 1.0.0
*/
const creatCirclePoints = (meter, color) => {
    if (typeof meter !== "object" || typeof color !== "string")
        return false
    const points = createCirclePointPaths();
    let dots = [];
    for (let i=0; i<4; i++)
    {
        dots[i] = meter.append("path").attr("fill", color);
        dots[i].attr("d", points[i]);
    }
};

/**
* @function createSvg
* @description Appends main svg element to dom
* @param {string} appendTo Id of which svg element will be appended
* @param {string} arcName represents Id to attreibute to new div
* @returns {object} d3 svg element
* @since 1.0.0
*/
const createSvg = (appendTo, arcName) => {
    if (typeof appendTo !== "string" || typeof arcName !== "string")
        return false
    const width = 160,
    height = 160;
    return d3.select(appendTo).append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id",arcName)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
};

/**
* @function formatNumber
* @description Appends main svg element to dom
* @param {string} numberFormat represnts localeFormat option for formatting number in meter
* @param {number} total combined total represnts 100% of whatever meter is measuring
* @returns {string} the the formatted number to be appended to dom
* @since 1.0.0
*/
const formatNumber = (numberFormat, total) => {
    if (typeof numberFormat !== "string" || typeof total !== "number")
        return false
    const localeFormatOptions = {
        "decimal": ".",
        "thousands": ".",
        "grouping": [3],
        "currency": ["","€"]
    };
    let euro = d3.formatLocale(localeFormatOptions),
        formatPercent = euro.format(numberFormat)(total);
        return formatPercent;
};

/**
* @function createContainer
* @description Creates and appends the parent container the meter will be placed in
* @param {string} divId the id for the Main container
* @since 1.0.0
*/
const createContainer = (divId) => {
    if (typeof divId !== "string")
        return false
    let div = document.createElement('div');
    div.setAttribute("id", divId);
    div.setAttribute("class", "charts");
    document.getElementById("app").append(div);
};

/**
* @function createBottomInfo
* @description Creates and appends the information to be displayed below the meter
* @param {number} tablet represents tablet allocation of total
* @param {number} smartphone represents smartphone allocation of total
* @param {number} total the total represntation of whatever is being measured
* @param {string} primary Hex combination representing the color designated to smartphone allocation
* @param {string} secondary Hex combination representing the color designated to tablet allocation
* @param {string} unit The localeFormat option used to determine weather to place euro sign of not
* @param {string} appendDiv the id for the Main container by which to append bottom information
* @since 1.0.0
*/
const createBottomInfo = (tablet, smartphone, total, primary, secondary, unit, appendDiv) => {
    if (typeof tablet !== "number" || typeof smartphone !== "number" || typeof total !== "number" || typeof primary !== "string" || typeof secondary !== "string" || typeof unit !== "string" || typeof appendDiv !== "string")
        return false
    const euroSymbol = unit === "$," ? "€" : "";
    const tabletPercent = (tablet/total) * 100;
    const smartphonePercent = (smartphone/total) * 100;
    let div = document.createElement('div');
    div.setAttribute("class", "bottom-info")
    div.innerHTML = `<div class="tablet-info">
                        <div style="color:${secondary};" class="tablet-header">Tablet</div>
                        <div><span class="tablet-percent">${tabletPercent}%</span><span class="tablet-total">${tablet.toLocaleString('de-DE')}${euroSymbol}</span></div>
                    </div>
                    <div class="smartphone-info">
                        <div style="color:${primary};" class="smartphone-header">Smartphone</div>
                        <div><span class="smartphone-percent">${smartphonePercent}%</span><span class="smartphone-total">${smartphone.toLocaleString('de-DE')}${euroSymbol}</span></div>
                    </div>`
    let parent = document.getElementById(appendDiv);
    parent.appendChild(div);
};

/**
* @function placeSquiggleGraph
* @description Creates and appends div containing graph image within meter chart
* @param {string} image path to image asset
* @param {string} appendDiv the id for the Main container by which to append bottom information
* @since 1.0.0
*/
const placeSquiggleGraph = (image, appendDiv) => {
    if (typeof image !== "string" || typeof appendDiv !== "string")
        return false
    let div = document.createElement('div');
    div.setAttribute("class", "squiggle-image")
    div.innerHTML = `<img src="${image}" height="50" width="120">`
    let parent = document.getElementById(appendDiv);
    parent.appendChild(div);
};

/**
* @function init
* @description mMain function to be called in order to render chart view
* @param {object} measurement main object per information being measured from api
* @since 1.0.0
*/
const init = (measurement) => {
    if (typeof measurement !== "object")
        return false

    const twoPi = 2 * Math.PI;
    const appendTo = `#${measurement.name}`;

    createContainer(measurement.name);
   
    const svg = createSvg(appendTo, `${measurement.name}-arc`);
    const meter = svg.append("g");

    const arc = d3.arc()
      .startAngle(0)
      .innerRadius(75)
      .outerRadius(80);

    meter.append("path")
    .attr("fill", measurement.secondary)
    .attr("d", arc.endAngle(twoPi));

    meter.append("text")
        .attr("text-anchor", "middle")
        .attr("class", "description")
        .attr("dy", "-1em")
        .text(measurement.name);

    const percentComplete = meter.append("text")
        .attr("text-anchor", "middle")
        .attr("class", "percent-complete")
        .attr("dy", ".4em");
    
    creatCirclePoints(meter, measurement.secondary);

    meter.append("path")
    .attr("fill", measurement.primary)
    .attr("d", arc.endAngle(twoPi * (measurement.smartphone / measurement.total)));

    const formatPercent = formatNumber(measurement.unit,measurement.total);

    percentComplete.text(formatPercent);
    createBottomInfo(measurement.tablet, measurement.smartphone, measurement.total, measurement.primary, measurement.secondary, measurement.unit, measurement.name);
    placeSquiggleGraph(measurement.image, measurement.name);
};


module.exports = {
    'init': init,
    'degreeCalc': degreeCalc,
    'createCirclePointPaths': createCirclePointPaths,
    'creatCirclePoints': creatCirclePoints,
    'createSvg': createSvg,
    'formatNumber': formatNumber,
    'createContainer': createContainer,
    'createBottomInfo': createBottomInfo,
    'placeSquiggleGraph': placeSquiggleGraph,
};



 


