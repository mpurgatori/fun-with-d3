const path = require('path');

const JasmineConsoleReporter = require('jasmine-console-reporter');
var Jasmine = require('jasmine');
var HtmlReporter = require('jasmine-pretty-html-reporter').Reporter;
var jasmine = new Jasmine();

const reporter = new JasmineConsoleReporter({
  colors: 1,           // (0|false)|(1|true)|2
  cleanStack: 1,       // (0|false)|(1|true)|2|3
  verbosity: 4,        // (0|false)|1|2|(3|true)|4
  listStyle: 'indent', // "flat"|"indent"
  activity: false,     // boolean or string ("dots"|"star"|"flip"|"bouncingBar"|...)
  emoji: true,
  beep: true
});

jasmine.env.clearReporters();
jasmine.addReporter(reporter);

jasmine.loadConfigFile('spec/support/jasmine.json');

// options object
jasmine.addReporter(new HtmlReporter({
  path: path.join(__dirname,'results')
}));

jasmine.execute();


