/// <reference types="cypress-xpath" />
require('cypress-xpath');

describe('Admin', () => {
  it('Create Admin', () => {

    cy.loginAdmins();
    cy.UncaughtException()
    cy.AdminCreateAdmin()
  

  });
});
