const view = require('../scripts/view-component.js')
const jsdom = require("jsdom");

const { JSDOM } = jsdom;
const { window } = new JSDOM('<!doctype html><html><body></body></html>');
global.document = window.document;
global.window = window;




describe("View component", () => {

    describe("degreeCalc helper", () => {
        it("should be a function", function() {
            expect(typeof view.degreeCalc).toBe("function");
        });

        it("should return false if passed anything but a number", function() {
            expect(view.degreeCalc('string')).toBeFalsy();
        });

        it("should return a number when passed a number", function() {
            expect(typeof view.degreeCalc(1)).toBe("number");
        });
    });

    describe("createCirclePointPaths", () => {
        it("should be a function", function() {
            expect(typeof view.createCirclePointPaths).toBe("function");
        });

        it("should return an arry", function() {
            expect(Array.isArray(view.createCirclePointPaths())).toBeTruthy();
        });

        it("should contain array of four functions", function() {
            const circlePointArray = view.createCirclePointPaths();
            circlePointArray.forEach( point => {
                expect(typeof point).toBe("function");
            })
        });
    });

    describe("creatCirclePoints", () => {
        it("should be a function", function() {
            expect(typeof view.creatCirclePoints).toBe("function");
        });

        it("should return false if param 1 is anything but an object", function() {
            expect(view.creatCirclePoints('string', 'string')).toBeFalsy();
        });

        it("should return false if param 2 is anything but a string", function() {
            expect(view.creatCirclePoints({}, 3)).toBeFalsy();
        }); 
        
    });

    describe("createSvg", () => {

        it("should be a function", function() {
            expect(typeof view.createSvg).toBe("function");
        });

        it("should return false if param 1 is anything but a string", function() {
            expect(view.createSvg([], 'string')).toBeFalsy();
        });

        it("should return false if param 2 is anything but a string", function() {
            expect(view.createSvg('string', 3)).toBeFalsy();
        }); 

        it("should return an object", function() {
            expect(typeof view.createSvg('string', 'string')).toBe('object');
        }); 
        
    });
    
});