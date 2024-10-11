/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import { LoginPage } from '../support/ui/pages';
import { RegisterPage } from '../support/ui/pages/register.page';

describe('Register Tests', () => {
    let email = faker.internet.email();
    let password = faker.internet.password();

    before(() => {
        cy.visit('/');
        // close Welcome to OWASP popup
        LoginPage.overlay.backDropOverlay.click(-50, -50, { force: true });

        LoginPage.navBar.accountBtn.click();
        LoginPage.navBar.loginBtn.click();
        LoginPage.registerLnk.click({ force: true });
    });

    it('Validate user can Register an new account', () => {

        cy.intercept('POST', '**/Users/').as('createUser');
        RegisterPage.emailFld.type(email);
        RegisterPage.passwordFld.type(password);
        RegisterPage.confirmPasswordFld.type(password);
        RegisterPage.securityQuestionDropdown.click();
        RegisterPage.securityQuestionList.first().click();
        RegisterPage.securityAnswerFld.type(faker.person.fullName());
        RegisterPage.registerBtn.click();

        // validate user is created
        cy.wait('@createUser').then(({ response }) => {
            expect(response.statusCode).to.eq(201);
            expect(response.body.data.email).to.equal(email);
            expect(response.body.data).property('email').to.equal(email);
        })

        RegisterPage.snackBar.notification.contains('Registration completed successfully.')

        // verify redirect to login page
        cy.url().should('contain', '/login');
    });

});

