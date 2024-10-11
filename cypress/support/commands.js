
import { registerUserApi, loginUser } from "./api";

Cypress.Commands.add('login', () => {
    registerUserApi().then(function () {
        loginUser(this.registeredUser);
        window.localStorage.setItem('token', JSON.stringify(this.token));
        cy.visit('/');
        cy.get('.cdk-overlay-backdrop').click(-50, -50, { force: true });
    })
})