const {
  Before,
  After,
  Given,
  Then 
} = require("cypress-cucumber-preprocessor/steps");

beforeEach( () => {
    Given ('I open spree page', () => {
        cy.visit('localhost:3000')
    })
}
)

When('Click Login link', rating=>
{
    cy.get().click()
})

