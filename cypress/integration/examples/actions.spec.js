/// <reference types="Cypress" />

context('Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/');
    });

    it('prev - should be disabled at start', () => {
        cy.get('[data-its-slider-button-prev]')
            .should('be.disabled');
    });

    it('prev - should be enabled after move', () => {
        cy.get('[data-its-slider-button-next]')
            .click()
            .wait(1000)
            .get('[data-its-slider-button-prev]')
            .should('not.be.disabled');
    });

    it('next - should be disabled at end', () => {
        cy.get('[data-its-slider-button-next]')
            .click()
            .wait(1000)
            .click()
            .wait(1000)
            .click()
            .wait(1000)
            .click()
            .wait(1000)
            .click()
            .wait(1000)
            .should('be.disabled');
    });

});
