const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
    allScriptsTimeout: 11000,

    specs: [
        'e2e/*.scenarios.ts'
    ],

    SELENIUM_PROMISE_MANAGER: false,

    localSeleniumStandaloneOpts: {
        // undocumented option to pass the stdio output of selenium webdriver to
        // console
        stdio: "inherit",
    },

    capabilities: {
        'browserName': 'chrome',
        chromeOptions: {
            // minimal supported browser size for tests
            // if smaller we start need to scroll for clicking buttons
            args: ['--window-size=1024,768']
        }
    },

    baseUrl: 'http://localhost:8011',

    framework: 'jasmine',

    jasmineNodeOpts: {
        // jasmine requires that whole test is completed within
        // defaultTimeoutInterval. If we accidentally exceed this timeout,
        // jasmine will not stop the execution of the test method, but will
        // simply start afterEach() callback and fail the test. The test code
        // will likely fail too as the page was pulled from under its feet.
        // The test error messages will make the cause of the failure very
        // confusing. Thus we increase the timeout value to one that hopefully
        // will never be exceeded.
        defaultTimeoutInterval: 1000000,
        print: function() {}
    },

    onPrepare() {
         jasmine.getEnv().addReporter(new SpecReporter({
             displayFailuresSummary: true,
             displayFailuredSpec: true,
             displaySuiteNumber: true,
             displaySpecDuration: true
         }));

        require('ts-node').register({
          project: './tsconfig.ee.json'
        });
    }
};
