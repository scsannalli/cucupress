import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import getPayLoad from "../../../db/mysqlactions"

var envVal = false;
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
      if(envVal)
      {
        cy.log("Trigger Backend validation");
        getPayLoad
      } 

  });

  afterEach(function () {
    cy.log('Run after every test for every spec file!!!!!!');
    cy.end  
  })