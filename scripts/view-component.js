const d3 = require("d3");


let width = 160,
    height = 160,
    twoPi = 2 * Math.PI;

//Config object for d3 localeFormat function
const localeFormatOptions = {
    "decimal": ".",
    "thousands": ".",
    "grouping": [3],
    "currency": ["","€"]
};

//
const degreeCalc = (degree)=> {
    return degree * Math.PI / 180.0;
};
    
const arc = d3.arc()
      .startAngle(0)
      .innerRadius(75)
      .outerRadius(80);
 
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

 
const creatCirclePoints = (meter, color) => {
    const points = createCirclePointPaths();
    let dots = [];
    for (let i=0; i<4; i++)
    {
        dots[i] = meter.append("path").attr("fill", color);
        dots[i].attr("d", points[i]);
    }
};

const createSvg = (appendTo, arcName) => {
    return d3.select(appendTo).append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id",arcName)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
};

const formatNumber = (numberFormat, total) => {
    let euro = d3.formatLocale(localeFormatOptions),
        formatPercent = euro.format(numberFormat)(total);
        return formatPercent;
};
  
const createContainer = (divId) => {
    let div = document.createElement('div');
    div.setAttribute("id", divId);
    div.setAttribute("class", "charts");
    document.getElementById("app").append(div);
};

const createBottomInfo = (tablet, smartphone, total, primary, secondary, unit, appendDiv) => {
    const euroSymbal = unit === "$," ? "€" : "";
    const tabletPercent = (tablet/total) * 100;
    const smartphonePercent = (smartphone/total) * 100;
    let div = document.createElement('div');
    div.setAttribute("class", "bottom-info")
    div.innerHTML = `<div class="tablet-info">
                        <div style="color:${secondary};" class="tablet-header">Tablet</div>
                        <div><span class="tablet-percent">${tabletPercent}%</span><span class="tablet-total">${tablet.toLocaleString('de-DE')}${euroSymbal}</span></div>
                    </div>
                    <div class="smartphone-info">
                        <div style="color:${primary};" class="smartphone-header">Smartphone</div>
                        <div><span class="smartphone-percent">${smartphonePercent}%</span><span class="smartphone-total">${smartphone.toLocaleString('de-DE')}${euroSymbal}</span></div>
                    </div>`
    let parent = document.getElementById(appendDiv);
    parent.appendChild(div);
};


const placeSquiggleGraph = (image, appendDiv) => {
    let div = document.createElement('div');
    div.setAttribute("class", "squiggle-image")
    div.innerHTML = `<img src="${image}" height="50" width="120">
    `
    let parent = document.getElementById(appendDiv);
    parent.appendChild(div);
};

const init = (measurement) => {

    createContainer(measurement.name);

    appendTo = `#${measurement.name}`;

    const svg = createSvg(appendTo, `${measurement.name}-arc`);

    const meter = svg.append("g");

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

    formatPercent = formatNumber(measurement.unit,measurement.total);

    percentComplete.text(formatPercent);
    createBottomInfo(measurement.tablet, measurement.smartphone, measurement.total, measurement.primary, measurement.secondary, measurement.unit, measurement.name);
    placeSquiggleGraph(measurement.image, measurement.name);
};


module.exports = {
'init':init
};



 


