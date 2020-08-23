export {} // error "All files must be modules when isolatedModules flag is provided"
describe("Index page", () => {
    beforeEach(() => {
        cy.visit("/")
    })

    it("should have the text Login Page", () => {
        cy.contains("Login Page")
    })
})
