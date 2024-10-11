export const NavBar = new class {
    get cartBtn() { return cy.get('.mat-toolbar-row') }
    get accountBtn() { return cy.get('#navbarAccount') }
    get loginBtn() { return cy.get('#navbarLoginButton') }
}