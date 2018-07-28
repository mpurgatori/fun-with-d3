const d3 = require("d3");

const degreeCalc = (degree)=> {
    return degree * Math.PI / 180.0;
};

let dot1, dot2, dot3, dot4;
let dots = [dot1, dot2, dot3, dot4];
  

let width = 160,
    height = 160,
    twoPi = 2 * Math.PI,
    progress = 0;

const arc = d3.arc()
      .startAngle(0)
      .innerRadius(75)
      .outerRadius(80);
  
const dotArc1 = d3.arc()
    .startAngle(degreeCalc(89))
    .endAngle(degreeCalc(91))
    .innerRadius(70)
    .outerRadius(73);

const dotArc2 = d3.arc()
    .startAngle(degreeCalc(179))
    .endAngle(degreeCalc(181))
    .innerRadius(70)
    .outerRadius(73);

const dotArc3 = d3.arc()
    .startAngle(degreeCalc(269))
    .endAngle(degreeCalc(271))
    .innerRadius(70)
    .outerRadius(73);

const dotArc4 = d3.arc()
    .startAngle(degreeCalc(-1))
    .endAngle(degreeCalc(1))
    .innerRadius(70)
    .outerRadius(73);

const points = [dotArc1, dotArc2, dotArc3, dotArc4];
 
const createSvg = (appendTo, arcName) => {
    console.log(appendTo, '!!!!!!')
    return d3.select(appendTo).append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id",arcName)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
};

const formatNumber = (numberFormat,total) => {
    let euro = d3.formatLocale({
        "decimal": ".",
        "thousands": ".",
        "grouping": [3],
        "currency": ["","€"]
        }),
        formatPercent = euro.format(numberFormat)(total);
        return formatPercent;
};
  


const init = (measurement) => {

    var div = document.createElement('div');
    div.setAttribute("id", measurement.name);
    div.setAttribute("class", "charts");
    document.getElementById("app").append(div);

    appendTo = `#${measurement.name}`;

    const svg = createSvg(appendTo, `${measurement.name}-arc`);

    const meter = svg.append("g");

    meter.append("path")
    .attr("fill", measurement.secondary)
    .attr("d", arc.endAngle(twoPi));

    const foreground = meter.append("path")
    .attr("fill", measurement.primary);

    const dotsArray = dots.map((dot)=> {
        dot = meter.append("path").attr("fill", measurement.primary);
        return dot;
    });
    
    meter.append("text")
        .attr("text-anchor", "middle")
        .attr("class", "description")
        .attr("dy", "-1.5em")
        .text(measurement.name);

    const percentComplete = meter.append("text")
        .attr("text-anchor", "middle")
        .attr("class", "percent-complete")
        .attr("dy", ".4em");
    
    
    const i = d3.interpolate(progress, measurement.smartphone / measurement.total);

    d3.transition().duration(1000).tween("progress", function() {
        return (t) => {
            progress = i(t);
            foreground.attr("d", arc.endAngle(twoPi * progress));
            dotsArray.forEach((dot, i)=>{
            dot.attr("d", points[i]);
            });

            formatPercent = formatNumber(measurement.unit,measurement.total);
            percentComplete.text(formatPercent);
        };
    });
};



module.exports = {
'init':init
};



 


