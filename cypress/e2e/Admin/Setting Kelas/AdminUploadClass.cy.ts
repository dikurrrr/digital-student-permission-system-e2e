/// <reference types="cypress-xpath" />
require('cypress-xpath');

describe('Admin', () => {
  it('Upload Class', () => {

    cy.loginAdmins();
    cy.UncaughtException()
    cy.UploadClass()

  });
});
