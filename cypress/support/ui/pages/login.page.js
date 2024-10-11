import { NavBar, Overlay } from "../components";
import Page from "./page";

export const LoginPage = new class extends Page {
    get emailFld() { return cy.get('#email') }
    get passwordFld() { return cy.get('#password') }
    get loginBtn() { return cy.get('#loginButton') }
    get registerLnk() {return cy.get('#newCustomerLink').find('[routerlink="/register"]')}

    overlay = Overlay;
    navBar = NavBar;
}