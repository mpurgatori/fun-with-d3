const chartComponent = require("./view-component.js");

//Call fake Server for data
fetch('http://localhost:3000/measures')
  .then((response)=> {
    return response.json();
  })
  .then((data)=> {
    data.forEach(measurement => {
        chartComponent.init(measurement);
    });
  });



