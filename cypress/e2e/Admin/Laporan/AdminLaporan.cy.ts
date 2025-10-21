/// <reference types="cypress-xpath" />
require('cypress-xpath');

describe('Admin', () => {
  it('Download Laporan', () => {

    cy.loginAdmins();
    cy.UncaughtException()
    cy.AdminLaporan()
    

  });
});
