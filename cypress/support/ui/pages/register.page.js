import { SnackBar } from "../components";
import Page from "./page";

export const RegisterPage = new class extends Page {
    get emailFld() { return cy.get('#emailControl') }
    get passwordFld() { return cy.get('#passwordControl') }
    get confirmPasswordFld() { return cy.get('#repeatPasswordControl') }
    get securityQuestionDropdown() { return cy.get('#mat-select-2')}
    get securityQuestionList() {return cy.get('#mat-select-2-panel').children('[id^="mat-option"]')}
    get securityAnswerFld() {return cy.get('#securityAnswerControl')}
    get registerBtn() {return cy.get('#registerButton')}
    

    snackBar = SnackBar;
}