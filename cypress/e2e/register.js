/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Register and Login Tests - e2e tests', () => {
    //TODO: use page-object and elements
    let email = faker.internet.email();
    let password = faker.internet.password();

    it('Validate user can Register an new account', () => {
        cy.visit('/register');

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

        // validate user is created
        cy.wait('@createUser').then(({ response }) => {
            expecte(response.statusCode).to.eq(200);
            expect(response.body.data.email).to.equal(email);
            expect(response.body.data).property('email').to.equal(email);
        })

        // success - notification
        cy.get('.mat-simple-snack-bar-content').contains('Registration completed successfully.')

        // redirect to login page
        cy.url().should('contain', '/login');


    });

});

