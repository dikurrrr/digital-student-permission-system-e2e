/// <reference types="cypress-xpath" />
require('cypress-xpath');



describe('Login Muhi', () => {
  it('Login Ustadz', () => {

    cy.URL();
    cy.loginUstadz();
    cy.uncaughtException();
    cy.logout()
    cy.confirmLogout()

  });
});
