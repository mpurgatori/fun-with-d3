const chartComponent = require("./view-component.js");
const dataIfServerFails = require("../model/data.json")

//Call fake Server for data
fetch('http://localhost:3000/measures')
  .then((response)=> {
    return response.json();
  })
  .then((data)=> {
    console.log('Fake Server Running')
    data.forEach(measurement => {
        chartComponent.init(measurement);
    });
  })
  .catch(function() {
    console.log("Server fail fallback; Please Start Fake Server by running npm i and then npm start.");
    dataIfServerFails.measures.forEach(measurement => {
        chartComponent.init(measurement);
    });
});