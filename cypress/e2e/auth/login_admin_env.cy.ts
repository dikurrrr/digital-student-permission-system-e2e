// /// <reference types="cypress-xpath" />
// require('cypress-xpath');

describe('Login Muhi', () => {
  it('Login Admin', () => {

    cy.login_ADMIN_ENV();
    cy.UncaughtException();
    cy.profile();
    cy.logout()
    cy.confirmLogout()

  });
});
