/// <reference types="Cypress" />

context('Progressive Enhancement', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/');
    });

    it('progressive enhancement - should be enhanced when loaded', () => {
        cy.get('[data-its-slider-enhanced]')
            .should('be.visible');
    });
});
