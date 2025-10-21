/// <reference types="cypress-xpath" />
require('cypress-xpath');

describe('Login Muhi', () => {
  it('Login Siswa', () => {

    cy.URL();
    cy.loginSiswa();
    cy.UncaughtException();
    cy.logout()
    cy.confirmLogout()

  });
});
