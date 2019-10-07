/// <reference types="Cypress" />

context('One Slide', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/one.html');
    });

    it('prev - should be disabled at start', () => {
        cy.get('[data-its-slider-button-prev]')
            .should('be.disabled');
    });

    it('next - should be disabled at start', () => {
        cy.get('[data-its-slider-button-next]')
            .should('be.disabled');
    });
});
