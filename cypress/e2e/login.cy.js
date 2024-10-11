/// <reference types="cypress" />

import { LoginPage } from "../support/ui/pages";

describe('Login Tests - via UI tests', () => {
    before(() => {
        cy.registerUser();
    });

    it('Validate user can sucessfully Login', function () {
        cy.visit('/');
        
        // close Welcome to OWASP popup
        LoginPage.overlay.backDropOverlay.click(-50, -50, { force: true });

        LoginPage.navBar.accountBtn.click();
        LoginPage.navBar.loginBtn.click();

        cy.intercept('POST', '**/user/login').as('userLogin');

        LoginPage.emailFld.type(this.registeredUser.email);
        LoginPage.passwordFld.type(this.registeredUser.password);
        LoginPage.loginBtn.click();

        cy.wait('@userLogin').its('response.statusCode').should('eq', 200);

        LoginPage.navBar.cartBtn.should('contain', '0');

    });
});