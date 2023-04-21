/* globals cy */

describe ('Test App', () => {
    it ('launches', () => {
        cy.visit ('/');
    });

    it ('Sees the Upload Input Name', () => {
        cy.visit ('/upload');
        cy.get('#description').should('contain', '');
    });

    it ('Type input into Description', () => {
        cy.visit ('/upload');
        cy.get('#description').type('This is a test');
        cy.get('#description').should('have.value', 'This is a test');
    })
});