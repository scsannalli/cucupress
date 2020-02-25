const {Given, When, Then } =  require("cypress-cucumber-preprocessor/steps");

var envVal;
beforeEach(function () {
  cy.log('Run before every test for every spec file');
  envVal = Cypress.env('backend')
})

  Given ('I\'m on the Client Connect Login Page', () => {
    cy.visit('localhost:3000');
  } 
  );

  When('I enter User Valid Credentials', rating=>
  {
      cy.get('#link-to-login').click();
  });

  When('I enter User In Valid Credentials', rating=>
  {
      cy.get('#link-to-login').click();
  });

  Then('I Can access Client Connect Dashboard', rating=>
  {   
        cy.log("Trigger Backend validation");
        cy.task('api')
        cy.task('queryDb')
        cy.task('odb')
  });


  Then('I see Invalid user error message', rating=>
  {   
        cy.log("Trigger Backend validation");

  });



  afterEach(function () {
    cy.log('Run after every test for every spec file!!!!!!');
    cy.end  
  })