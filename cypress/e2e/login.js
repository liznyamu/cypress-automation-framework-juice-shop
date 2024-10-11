/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Login Tests - via UI tests', () => {
    // let email = faker.internet.email();
    // let password = faker.internet.password();
    beforeEach(() => {
        registerUserApi().then( function() {
            loginRequest(this.registeredUser);
            window.localStorage.setItem('token', JSON.stringify(this.token));
            cy.visit('/');            
        })
    });

    it('Some check here', function () {
        cy.intercept('GET', `${Cypress.env('apiUrl')}/api/Quantitys/`, {fixture: 'products'});
        cy.get('.cdk-overlay-backdrop').click(-50, -50, { force: true });
        // navbar top >> cart 
        cy.get('.mat-toolbar-row').should('contain', '0');        
    });

    const registerUserApi = function () {
        {
            let email = faker.internet.email();
            let password = faker.internet.password();
            let registerUserPayload = {
                "email": email,
                "password": password,
                "passwordRepeat": password,
                "securityQuestion": {
                    "id": 1,
                    "question": "Your eldest siblings middle name?",
                    "createdAt": "2024-10-11T08:15:31.631Z",
                    "updatedAt": "2024-10-11T08:15:31.631Z"
                },
                "securityAnswer": "Steven Feest"
            };

            return cy.request('POST', `${Cypress.env('apiUrl')}/api/Users/`, registerUserPayload).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body.data).property('email').to.eq(email);
                cy.wrap({ email, password }).as('registeredUser');
            })
        }
    }

    const loginRequest = function (registeredUser) {
        cy.request({
            method: 'POST', url: `${Cypress.env('apiUrl')}/rest/user/login`,
            body: registeredUser
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.authentication).to.have.property('token');
            cy.wrap(response.body.authentication.token, {log: false}).as('token');
        })
    }


    xit('Validate user can sucessfully Login', () => {
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