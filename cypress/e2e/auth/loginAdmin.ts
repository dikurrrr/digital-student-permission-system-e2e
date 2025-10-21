/// <reference types="cypress-xpath" />
require('cypress-xpath');



describe('Login Muhi', () => {
  it('Login Admin', () => {

    cy.URL();
    cy.loginAdmin();
    cy.uncaughtException();
    cy.logout()
    cy.confirmLogout()

  });
});
