/// <reference types="cypress" />

describe('Login Tests - via API tests', () => {
    //TODO: use page-object and elements
    beforeEach(() => {
        cy.login();
    });

    it('login ', function () {
        cy.log(`registered user: ${JSON.stringify(this.registeredUser)}`);
        cy.intercept('GET', `${Cypress.env('apiUrl')}/api/Quantitys/`, {fixture: 'products'});

        // navbar top >> cart 
        cy.get('.mat-toolbar-row').should('contain', '0');        
    });
});

describe('Login Tests - via UI tests', () => {
    before(() => {
        cy.registerUser();
    });

    it('Validate user can sucessfully Login', function () {
        cy.visit('/');

        cy.get('.cdk-overlay-backdrop').click(-50, -50, { force: true });

        cy.get('#navbarAccount').click();
        cy.get('#navbarLoginButton').click();

        cy.intercept('POST', '**/user/login').as('userLogin');
        cy.get('#email').type(this.registeredUser.email);
        cy.get('#password').type(this.registeredUser.password);
        cy.get('#loginButton').click();


        cy.wait('@userLogin').its('response.statusCode').should('eq', 200);
        
        // navbar top >> cart 
        cy.get('.mat-toolbar-row').should('contain', '0');

    });
});