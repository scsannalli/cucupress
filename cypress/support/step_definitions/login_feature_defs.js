const {Given, When, Then } =  require("cypress-cucumber-preprocessor/steps");

var envVal;
beforeEach(function () {
  cy.log('Run before every test for every spec file');
  envVal = Cypress.env('backend')
})

  Given ('I open home page', () => {
    cy.visit('localhost:3000');
  } 
  );

  When('Click Login link', rating=>
  {
      cy.get('#link-to-login').click();
  });

  Then('I see UserName Field', rating=>
  {   
        cy.log("Trigger Backend validation");
        cy.task('api')
        cy.task('queryDb')
        cy.task('odb')
  });

  afterEach(function () {
    cy.log('Run after every test for every spec file!!!!!!');
    cy.end  
  })