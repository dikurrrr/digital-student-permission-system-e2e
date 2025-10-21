// /// <reference types="cypress-xpath" />
// require('cypress-xpath');

describe('Login Muhi', () => {
  it('Login Siswa', () => {

    cy.loginSISWA();
    cy.UncaughtException();
    cy.profile();
    cy.logout();
    cy.confirmLogout();

  });
});
