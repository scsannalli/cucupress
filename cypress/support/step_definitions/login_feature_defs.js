import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
  
  
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
      
  });