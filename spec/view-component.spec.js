const view = require('../scripts/view-component.js');
const d3 = require("d3");
const jsdom = require("jsdom");

const { JSDOM } = jsdom;
const { window } = new JSDOM('<!doctype html><html><body></body></html>');
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

        // it("Should call d3's select method", function() {
        //     spyOn(d3, 'select')
        //     view.createSvg();
        //     expect(d3.select).toHaveBeenCalled()
        // }); 
        
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

        it("Should return an object", function() {
            expect(typeof view.createContainer('string', 'string')).toBe('object');
        }); 
        
    });
    
});