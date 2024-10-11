/// <reference types="cypress" />

import { ProductsPage } from "../support/ui/pages";


describe('Product Tests - login via API tests', () => {
    beforeEach(() => {
        cy.login();
    });

    it('mock products list', function () {
        cy.log(`registered user: ${JSON.stringify(this.registeredUser)}`);
        cy.intercept('GET', `${Cypress.env('apiUrl')}/api/Quantitys/`, {fixture: 'products'});

        ProductsPage.navBar.cartBtn.should('contain', '0'); 
        cy.url().contains('/search');
       
    });
});
