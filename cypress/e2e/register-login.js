/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Register and Login Tests - e2e tests', () => {
    let email = faker.internet.email();
    let password = faker.internet.password();

    it('Validate user can Register an new account', () => {
        cy.visit('/');

        // close Welcome to OWASP popup
        cy.get('.cdk-overlay-backdrop').click(-50, -50, { force: true });

        cy.get('#navbarAccount').click();
        cy.get('#navbarLoginButton').click();

        cy.get('#newCustomerLink').find('[routerlink="/register"]').click({ force: true });

        cy.intercept('POST', '**/Users/').as('createUser');
        cy.get('#emailControl').type(email);
        cy.get('#passwordControl').type(password);
        cy.get('#repeatPasswordControl').type(password);

        // securityQuestion 
        cy.get('#mat-select-2').click()
        // list box > option >  Your eldest siblings middle name? 
        cy.get('#mat-select-2-panel').children('[id^="mat-option"]').first().click();
        cy.get('#securityAnswerControl').type(faker.person.fullName());
        cy.get('#registerButton').click();

        cy.wait('@createUser').its('response.statusCode').should('eq', 201);
        cy.get('@createUser').its('response.body.data.email').should('eq', email);
        cy.get('@createUser').then(({ response }) => {
            expect(response.body.data.email).to.equal(email);
            expect(response.body.data).property('email').to.equal(email);
        })

        // success - notification
        cy.get('.mat-simple-snack-bar-content').contains('Registration completed successfully.')

        // redirect to login page
        cy.url().should('contain', '/login');


    });

    it('Validate user can sucessfully Login', () => {
        // TODO use api requests to register a new user 
        cy.visit('/');

        cy.get('.cdk-overlay-backdrop').click(-50, -50, { force: true });

        cy.get('#navbarAccount').click();
        cy.get('#navbarLoginButton').click();

        cy.intercept('POST', '**/user/login').as('userLogin');
        cy.get('#email').type(email);
        cy.get('#password').type(password);
        cy.get('#loginButton').click();

        cy.wait('@userLogin').then(({ response }) => {
            expect(response.statusCode).to.eq(200);
            let accessToken = response.body.authentication.token;
            cy.wrap(response.body.authentication.token).as('accessToken');
            cy.log('accessToken - first' + accessToken);
        }).then(function () {
            let accessToken = this.accessToken;
            cy.log('accessToken - again\n' + accessToken)
        });

        // navbar top >> cart 
        cy.get('.mat-toolbar-row').should('contain', '0');

    });
});