/// <reference types="cypress" />

describe('Test Angular realworld app', () => {
    beforeEach("Log into the app", () => {
        cy.server()
        // stubbing, third parameter is a response
        cy.route("GET", "**/tags", "fixture:tags.json")
        cy.logInToApp()
    })

    it("Verify correct request and response", () => {

        cy.server()
        cy.route("POST", "**/articles").as("postArticles")

        cy.contains("New Article").click()
        cy.get("[formcontrolname='title']").type("Testing title")
        cy.get("[formcontrolname='description']").type("Testing description")
        cy.get("[formcontrolname='body']").type("Testing article body")
        cy.contains("Publish Article").click()

        cy.wait("@postArticles")
        cy.get("@postArticles").then(xhr => {
            expect(xhr.status).to.equal(200)
            expect(xhr.request.body.article.body).to.equal("Testing article body")
            expect(xhr.response.body.article.description).to.equal("Testing description")
        })
    })

    it("Should return tags with routing object", () => {
        cy.get(".tag-list")
            .should("contain", "cypress")
            .and("contain", "automation")
            .and("contain", "cypress")
    })

    it("Verify global feed likes count", () => {
        cy.route("GET", "**/articles/feed*", "{'articles':[],'articlesCount':0}")
        cy.route("GET", "**/articles*", "fixture:articles.json")

        cy.contains("Global Feed").click()
        cy.get("app-article-list button").then(listOfCountButtons => {
            expect(listOfCountButtons[0]).to.contain("2")
            expect(listOfCountButtons[1]).to.contain("12")
        })

        cy.fixture("articles").then(file => {
            const articleLink = file.articles[1].slug
            cy.route("POST", "**/articles/" + articleLink + "/favorite", file)
        })

        cy.get("app-article-list button")
            .eq(1)
            .click()
            .should("contain", "13")
    })

    it("Delete a new article in the global feed", () => {

        const bodyRequest = {
            "article": {
                "tagList": [],
                "title": "My favorite title",
                "description": "My favorite description",
                "body": "My favorite body"
            }
        }

        cy.get("@token").then(token => {

            cy.request({
                url: "https://conduit.productionready.io/api/articles",
                headers: {
                    "Authorization": "Token " + token
                },
                method: "POST",
                body: bodyRequest
            }).then(response => {
                expect(response.status).to.equal(200)
            })

            cy.contains("Global Feed").click()
            cy.get(".article-preview").first().click()
            cy.get(".article-actions").contains("Delete Article").click()

            // verifying that the article was deleted by checking if the title of the first article is not equal to the title of the article we have just removed
            cy.request({
                url: "https://conduit.productionready.io/api/articles?limit=10&offset=0",
                headers: {
                    "Authorization": "Token " + token
                },
                method: "GET",
            }).its("body").then(body => {
                expect(body.articles[0].title).not.to.equal("My favorite title")
            })
        })
    })    
})