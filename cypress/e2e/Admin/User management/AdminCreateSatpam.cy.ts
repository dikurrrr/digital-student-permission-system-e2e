/// <reference types="cypress-xpath" />
require('cypress-xpath');



describe('Admin', () => {
  it('Create Satpam', () => {

    cy.loginAdmins();
    cy.UncaughtException()
    cy.AdminCreateSecurity()

  });
});
