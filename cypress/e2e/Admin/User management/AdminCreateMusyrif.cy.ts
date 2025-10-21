/// <reference types="cypress-xpath" />
require('cypress-xpath');

describe('Admin', () => {
  it('Create Musyrif', () => {

    cy.loginAdmins();
    cy.UncaughtException()
    cy.AdminCreateMusyrif()

  });
});
