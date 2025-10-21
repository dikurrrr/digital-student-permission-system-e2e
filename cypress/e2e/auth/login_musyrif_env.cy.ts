// /// <reference types="cypress-xpath" />
// require('cypress-xpath');

describe('Login Muhi', () => {
  it('Login Musyrif', () => {

    cy.login_UST_ENV();
    cy.UncaughtException();
    cy.profile();
    cy.logout()
    cy.confirmLogout()

  });
});
