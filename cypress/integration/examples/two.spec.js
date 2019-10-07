/// <reference types="Cypress" />

context('Two Slides', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/two.html');
    });

    it('prev - should be disabled at start', () => {
        cy.get('[data-its-slider-button-prev]')
            .should('be.disabled');
    });

    it('prev - should be hidden at start', () => {
        cy.get('[data-its-slider-button-prev]')
            .should('not.be.visible');
    });

    it('next - should be disabled at start', () => {
        cy.get('[data-its-slider-button-next]')
            .should('be.disabled');
    });

    it('next - should be hidden at start', () => {
        cy.get('[data-its-slider-button-next]')
            .should('not.be.visible');
    });
});
