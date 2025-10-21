// /// <reference types="cypress-xpath" />
// require('cypress-xpath');

describe('Login Muhi', () => {
  it('Login Musyrif', () => {

    cy.login_UST_ENV();
    cy.uncaughtException();
    cy.profile();
    cy.logout()
    cy.confirmLogout()

  });
});
