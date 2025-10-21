/// <reference types="cypress-xpath" />
require('cypress-xpath');



describe('Admin', () => {
  it('Admin filter search user', () => {

    cy.loginAdmins();
    cy.UncaughtException()
    cy.searchUser()

  });
});
