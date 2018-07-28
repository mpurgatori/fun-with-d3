const chartComponent = require("./d3.js");


fetch('http://localhost:3000/measures')
  .then((response)=> {
    return response.json();
  })
  .then((data)=> {
      console.log(data)
    data.forEach(measurement => {
        chartComponent.init(measurement);
    });
  });



