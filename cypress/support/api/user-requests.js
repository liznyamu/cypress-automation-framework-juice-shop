import { userPayload } from './data';

export const registerUserApi = function () {
    {
        let registerUserPayload = userPayload();

        return cy.request('POST', `${Cypress.env('apiUrl')}/api/Users/`, registerUserPayload).then((response) => {
            const {email, password} = registerUserPayload;
            expect(response.status).to.eq(201);
            expect(response.body.data).property('email').to.eq(email);
            cy.wrap({ email, password }).as('registeredUser');
        })
    }
}

export const loginUser = function (registeredUser) {
    cy.request({
        method: 'POST', url: `${Cypress.env('apiUrl')}/rest/user/login`,
        body: registeredUser
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.authentication).to.have.property('token');
        cy.wrap(response.body.authentication.token, { log: false }).as('token');
    })
}