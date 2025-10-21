// /// <reference types="cypress-xpath" />
// require('cypress-xpath');

describe('Login Muhi', () => {
  it('Login Admin', () => {

    cy.login_ADMIN_ENV();
    cy.uncaughtException();
    cy.profile();
    cy.logout()
    cy.confirmLogout()

  });
});
