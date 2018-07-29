const view = require('../scripts/view-component.js');
const d3 = require("d3");
const jsdom = require("jsdom");

const { JSDOM } = jsdom;
const { window } = new JSDOM('<!doctype html><html><body><div id="app"></div></body></html>');
global.document = window.document;
global.window = window;

describe("View component", () => {

    describe("degreeCalc helper", () => {
        it("Should be a function", function() {
            expect(typeof view.degreeCalc).toBe("function");
        });

        it("Should return false if passed anything but a number", function() {
            expect(view.degreeCalc('string')).toBeFalsy();
        });

        it("Should return a number when passed a number", function() {
            expect(typeof view.degreeCalc(1)).toBe("number");
        });
    });

    describe("createCirclePointPaths", () => {
        it("Should be a function", function() {
            expect(typeof view.createCirclePointPaths).toBe("function");
        });

        it("Should return an arry", function() {
            expect(Array.isArray(view.createCirclePointPaths())).toBeTruthy();
        });

        it("Should contain array of four functions", function() {
            const circlePointArray = view.createCirclePointPaths();
            circlePointArray.forEach( point => {
                expect(typeof point).toBe("function");
            })
        });
    });

    describe("creatCirclePoints", () => {
        it("Should be a function", function() {
            expect(typeof view.creatCirclePoints).toBe("function");
        });

        it("Should return false if param 1 is anything but an object", function() {
            expect(view.creatCirclePoints('string', 'string')).toBeFalsy();
        });

        it("Should return false if param 2 is anything but a string", function() {
            expect(view.creatCirclePoints({}, 3)).toBeFalsy();
        }); 
        
    });

    describe("createSvg", () => {

        it("Should be a function", function() {
            expect(typeof view.createSvg).toBe("function");
        });

        it("Should return false if param 1 is anything but a string", function() {
            expect(view.createSvg([], 'string')).toBeFalsy();
        });

        it("Should return false if param 2 is anything but a string", function() {
            expect(view.createSvg('string', 3)).toBeFalsy();
        }); 

        it("Should return an object", function() {
            expect(typeof view.createSvg('string', 'string')).toBe('object');
        });         
    });

    describe("formatNumber", () => {
        it("Should be a function", function() {
            expect(typeof view.formatNumber).toBe("function");
        });

        it("Should return false if param 1 is anything but an string", function() {
            expect(view.formatNumber(true, 'string')).toBeFalsy();
        });

        it("Should return false if param 2 is anything but a number", function() {
            expect(view.formatNumber('string', 'string')).toBeFalsy();
        }); 

        it("Should return total as string with decimal every third placement without currency symbol when ',' unit passed", function() {
            expect(view.formatNumber(',', 200000)).toBe('200.000');
        }); 

        it("Should return total as string with decimal every third placement without currency symbol when ',' unit passed", function() {
            expect(view.formatNumber(',', 80000000)).toBe('80.000.000');
        }); 

        it("Should return total as string with decimal every third placement with currency symbol when '$,' unit passed", function() {
            expect(view.formatNumber('$,', 200000)).toBe('200.000€');
        }); 

        it("Should return total as string with decimal every third placement with currency symbol when '$,' unit passed", function() {
            expect(view.formatNumber('$,', 13400000)).toBe('13.400.000€');
        }); 
        
    });

    describe("createContainer", () => {

        it("Should be a function", function() {
            expect(typeof view.createContainer).toBe("function");
        });

        it("Should return false if anything passed but string", function() {
            expect(view.createContainer([])).toBeFalsy();
        });

        it("Should return false if anything passed but string", function() {
            expect(view.createContainer(false)).toBeFalsy();
        }); 

        it("Id passed to createContainer should be null before invokation but not after", function() {
            let element = document.getElementById('appDiv');
            expect(element === null).toBeTruthy();
            view.createContainer('appDiv');
            element = document.getElementById('appDiv');
            expect(element === null).toBeFalsy();
        }); 
    });

    describe("createBottomInfo", () => {

        it("Should be a function", function() {
            expect(typeof view.createBottomInfo).toBe("function");
        });

        it("Should return false if anything passed to param 1 but number", function() {
            expect(view.createBottomInfo([],2,3,'string','string','string','string')).toBeFalsy();
        });

        it("Should return false if anything passed to param 2 but number", function() {
            expect(view.createBottomInfo(1,null,3,'string','string','string','string')).toBeFalsy();
        });
        
        it("Should return false if anything passed to param 3 but number", function() {
            expect(view.createBottomInfo(1,2,{},'string','string','string','string')).toBeFalsy();
        });

        it("Should return false if anything passed to param 4 but string", function() {
            expect(view.createBottomInfo(1,2,3,4,'string','string','string')).toBeFalsy();
        });

        it("Should return false if anything passed to param 5 but string", function() {
            expect(view.createBottomInfo(1,2,3,4,undefined,'string','string')).toBeFalsy();
        });

        it("Should return false if anything passed to param 6 but string", function() {
            expect(view.createBottomInfo(1,2,3,4,'string',6,'string')).toBeFalsy();
        });

        it("Should return false if anything passed to param 7 but string", function() {
            expect(view.createBottomInfo(1,2,3,4,'string','string',[1])).toBeFalsy();
        });

        it("First element on the class list should be undefined before invokation but not after", function() {
            let div = document.createElement('div');
            div.id = 'example';
            let appParent = document.getElementById('app');
            appParent.appendChild(div);

            let element = document.getElementsByClassName("bottom-info");
            expect(element[0] === undefined).toBeTruthy();
            view.createBottomInfo(200, 300, 400, 'string', 'string', 'string', 'example');
            element = document.getElementsByClassName("bottom-info");
            expect(element[0] === undefined).toBeFalsy();
        }); 
    });

    describe("placeSquiggleGraph", () => {

        it("Should be a function", function() {
            expect(typeof view.placeSquiggleGraph).toBe("function");
        });

        it("Should return false if anything passed to param 1 but string", function() {
            expect(view.placeSquiggleGraph([],'string')).toBeFalsy();
        });

        it("Should return false if anything passed to param 2 but number", function() {
            expect(view.placeSquiggleGraph('string',null)).toBeFalsy();
        });

        it("First element on the class list should be undefined before invokation but not after", function() {
            let div = document.createElement('div');
            div.id = 'example2';
            let appParent = document.getElementById('app');
            appParent.appendChild(div);

            let element = document.getElementsByClassName("squiggle-image");
            expect(element[0] === undefined).toBeTruthy();
            view.placeSquiggleGraph('string', 'example2');
            element = document.getElementsByClassName("squiggle-image");
            expect(element[0] === undefined).toBeFalsy();
        }); 
    });

    describe("init", () => {

        it("Should be a function", function() {
            expect(typeof view.init).toBe("function");
        });

        it("Should return false if anything passed to param 1 other than object", function() {
            expect(view.init('HELLO WORLD')).toBeFalsy();
        });

    });
    
});