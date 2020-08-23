export {} // error "All files must be modules when isolatedModules flag is provided"
describe("Form page", () => {
    beforeEach(() => {
        cy.visit("/form")
    })

    it("should have the text Form Page", () => {
        cy.contains("Form Page")
    })
})
