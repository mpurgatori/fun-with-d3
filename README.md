# marfeel javascript test
A client side application to display data in an elegant circular meter charts with d3


1. To configure application, navigate to project root and run npm i on a machine that has node installed.

2. To start application, run - npm start - then open main.html in project root

3. To run tests run - npm test -; To open spec runner for tests open report.html located at spec/support/results from root.

About the project:

- I enjoyed working on this as it exposed me a little bit more to the d3 library and it's always good practice configuring applications from scratch.

- I used a fake server package as well as the fetch api to serve up data on localhost:3000. npm start should launch the fake server but if there are any issues the fetch error handler will just pull the json file directly so that the project can still be viewed. It is possible that the fake server would need to be installed globally (npm install -g json-server).

- Jasmine was used to unit test the view-component, the only file being tested as it contains 99% of the code. Main.js simply calls fetch and iterates the data with the view-component.

- I used a package called browserify to bundle and serve the javascript files so that require would work with no problems in the browser. You will notice that main.html imports scripts from a file called bundle.js wich is the bundled code. Browserify creates a new bundle every time npm start is run.

Things I wish I had time for:

- It was my intention to incorporate a carousel as a bonus when I completed the required work but I realized I should have planned for a carousel from the start to properly include it. 

- The only work around I used was in the inclusion of the graph half circles in the center of the main circles. The graphs did not seem to correlate to the data in any way so I photoshopped them out and included them as images. With a little more time I would try and see if I could recreate them as svg paths. Everything else about the charts (the circles, the color bars and the north,south,east,west points within the circle )are svg paths created via d3.

Total time was between 10-12 hours with the bulk of that going to learning what was needed from the d3 library.

I appreciate your time in reviewing this project and I hope to be in contact in the near future.

Thanks,
Mike

