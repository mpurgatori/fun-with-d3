# Fun with d3
A client side application to display data in an elegant circular meter charts with d3


1. To configure application, navigate to project root and run npm i on a machine that has node installed.

2. To start application run - npm start - then open main.html in project root.

3. To start tests run - npm test -; To open spec runner for tests open report.html located at spec/support/results from root.

About the project:

- I used a fake server package as well as the fetch api to serve up data on localhost:3000. npm start should launch the fake server but if there are any issues the fetch error handler will just pull the json file directly so that the project can still be viewed.

- Jasmine was used to unit test and standard jsdoc documentation was used in the view-component.

- I used a package called browserify to bundle and serve the javascript files so that require would work with no problems in the browser. Browserify creates a new bundle every time npm start is run but git saves the last committed bundle.

Total time was between 10-12 hours with the bulk of that going to learning what was needed from the d3 library.
