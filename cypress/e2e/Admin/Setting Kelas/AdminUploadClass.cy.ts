/// <reference types="cypress-xpath" />
require('cypress-xpath');



describe('Admin', () => {
  it('Setting Class', () => {

    cy.loginAdmins();
    cy.UncaughtException()
    cy.UploadClass()

  });
});
