const d3 = require("d3");

const degreeCalc = (degree)=> {
    return degree * Math.PI / 180.0;
};
  
const mainColor = '#3d681c', 
      secondaryColor = '#88d440',
      category = 'REVENUE'
  
let width = 160,
    height = 160,
    twoPi = 2 * Math.PI,
    progress = 0,
    allocated = 80000,
    total = 200000,
    euro = d3.formatLocale({
    "decimal": ".",
    "thousands": ".",
    "grouping": [3],
    "currency": ["","€"]
}),
formatPercent = euro.format("$,")(total);

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
  
const svg = d3.select("#app").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
const meter = svg.append("g")
    .attr("class", "funds-allocated-meter");

meter.append("path")
    .attr("fill", secondaryColor)
    .attr("d", arc.endAngle(twoPi));

const foreground = meter.append("path")
    .attr("fill", mainColor);

const mapDots =()=> {
    let dot1, dot2, dot3, dot4;
    let dots = [dot1, dot2, dot3, dot4];
    return dots.map((dot)=> {
        dot = meter.append("path").attr("fill", mainColor);
        return dot;
    });    
};
  
const description = meter.append("text")
    .attr("text-anchor", "middle")
    .attr("class", "description")
    .attr("dy", "-1.5em")
    .text(category);

const percentComplete = meter.append("text")
    .attr("text-anchor", "middle")
    .attr("class", "percent-complete")
    .attr("dy", ".4em");
  
const i = d3.interpolate(progress, allocated / total);
  
const init = () => {
    d3.transition().duration(1000).tween("progress", function() {
        return function(t) {
            progress = i(t);
            foreground.attr("d", arc.endAngle(twoPi * progress));
            mapDots().forEach((dot, i)=>{
            dot.attr("d", points[i]);
            })
            percentComplete.text(formatPercent);
        };
    });
};



module.exports = {
'init':init
};