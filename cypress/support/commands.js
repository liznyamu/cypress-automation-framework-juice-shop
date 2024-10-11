
import { registerUserApi, loginUser } from "./api";
import { LoginPage } from "./ui/pages";

Cypress.Commands.add('login', () => {
    registerUserApi().then(function () {
        loginUser(this.registeredUser);
        window.localStorage.setItem('token', JSON.stringify(this.token));
        cy.visit('/');
        // close Welcome to OWASP popup
        LoginPage.overlay.backDropOverlay.click(-50, -50, { force: true });
    })
})

Cypress.Commands.add('registerUser', () => {
    registerUserApi()
})