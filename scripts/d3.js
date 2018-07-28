const d3 = require("d3");

function degreeCalc(degree) {
    return degree * Math.PI / 180.0;
  }
  
  const mainColor = '#3d681c'; 
  const secondaryColor = '#88d440';
  const category = 'REVENUE'
  
  const width = 160,
      height = 160,
      twoPi = 2 * Math.PI,
      progress = 0,
      allocated = 80000,
      total = 200000,
      euro = d3.timeFormatDefaultLocale({
        "decimal": ".",
        "thousands": ".",
        "grouping": [3],
        "currency": ["", "€"],
        "dateTime": "%a %b %e %X %Y",
        "date": "%m/%d/%Y",
        "time": "%H:%M:%S",
        "periods": ["AM", "PM"],
        "days": ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday","Friday", "Saturday"],
        "shortDays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        "shortMonths": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    }),
  formatPercent = euro.numberFormat("$,2f");
  
  const arc = d3.svg.arc()
      .startAngle(0)
      .innerRadius(75)
      .outerRadius(80);
  
  const arc2 = d3.svg.arc()
      .startAngle(degreeCalc(89))
      .endAngle(degreeCalc(91))
      .innerRadius(70)
      .outerRadius(73);
  
  const arc3 = d3.svg.arc()
      .startAngle(degreeCalc(179))
      .endAngle(degreeCalc(181))
      .innerRadius(70)
      .outerRadius(73);
  
  const arc4 = d3.svg.arc()
      .startAngle(degreeCalc(269))
      .endAngle(degreeCalc(271))
      .innerRadius(70)
      .outerRadius(73);
  
  const arc5 = d3.svg.arc()
      .startAngle(degreeCalc(-1))
      .endAngle(degreeCalc(1))
      .innerRadius(70)
      .outerRadius(73);
  
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
  
  const dotRight = meter.append("path")
      .attr("fill", mainColor);
  
  const dotLow = meter.append("path")
      .attr("fill", mainColor);
  
  const dotLeft = meter.append("path")
      .attr("fill", mainColor);
  
  const dotHigh = meter.append("path")
      .attr("fill", mainColor);
  
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
  
   const init = ()=> {
    d3.transition().duration(1000).tween("progress", function() {
        return function(t) {
          progress = i(t);
          foreground.attr("d", arc.endAngle(twoPi * progress));
          dotRight.attr("d", arc2);
          dotLow.attr("d", arc3);
          dotLeft.attr("d", arc4);
          dotHigh.attr("d", arc5);
          percentComplete.text(formatPercent(total));
        };
      });
   }



  module.exports = {
    'init':init
  };