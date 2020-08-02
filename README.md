# Summary

The repository contains tests written for the following app https://github.com/gothinkster/angular-realworld-example-app that was used during the https://www.udemy.com/course/cypress-web-automation-testing-from-zero-to-hero/ Udemy course.

## Setting up and running the app for testing

1. Clone the repository https://github.com/gothinkster/angular-realworld-example-app
2. Go to the *angular-realworld-example-app* folder and run the `npm install` or `yarn install` command (ignore outdated dependencies)
3. Ensure that you have the Angular CLI installed globally
3. Run the `ng serve` command to compile the app and deploy it to the localhost
4. Open `http://localhost:4200` 

If the instructions do not work, refer to the original repository of the app to get more information. 
### Installing Cypress

1. Install dependencies from the package.json file by running the following command:
```
    $ npm install
```

The info how to install Cypress from the scratch can be found [here](https://docs.cypress.io/guides/getting-started/installing-cypress.html#)

## Running tests

When the *angular-realworld-example-app* app is already running, in the separate terminal window, run Cypress by using one of the following commands:

Run tests headlessly:

```
    $ npx cypress run
```
or
```
    $ npm run tests
```

For the default Cypress browser - Electron, tests are being recorded when running headlessly.


Run tests via the Test Runner GUI:

```
    $ npm run cypress:open 
```
```
    $ npx cypress open
```

When the Cypress GUI opens, click the test file name to run it (example_spec.js is a default Cypress test file containing 90 tests to show how it works). 
To run a specific test suite only, use the following command: 

```
    $ npx cypress run --spec cypress/integration/app_spec.js

```
More commands can be found [here](https://docs.cypress.io/guides/guides/command-line.html#)
