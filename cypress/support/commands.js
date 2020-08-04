// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// logging in headlessly
Cypress.Commands.add("logInToApp", () => {

    const userCredentials = {
        "user": {
            "email": "thisaddressisnotreal@test.com",
            "password": "Testing123?"
        }
    }

    // we need to save our token in the local storage (you can see it in the Application / Local storage in the browser)
    cy.request("POST", "https://conduit.productionready.io/api/users/login", userCredentials)
        .its("body").then(body => {
            const token = body.user.token
            // save token as alias to use it in tests
            cy.wrap(token).as("token")
            cy.visit("/", {
                onBeforeLoad (win) {
                    win.localStorage.setItem("jwtToken", token)
                }
            })
        })
})