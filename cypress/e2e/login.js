/// <reference types="cypress" />

describe('Login Tests - via UI tests', () => {
    beforeEach(() => {
        cy.login();
    });

    it('login using api', function () {
        cy.log(`registered user: ${JSON.stringify(this.registeredUser)}`);
        cy.intercept('GET', `${Cypress.env('apiUrl')}/api/Quantitys/`, {fixture: 'products'});

        // navbar top >> cart 
        cy.get('.mat-toolbar-row').should('contain', '0');        
    });
});