/// <reference types="cypress" />

describe('Test width 1440px', () => {
    const login = 'Wally123';
    const pass = 'GarrusWally123';

    beforeEach(() => {
        cy.session([login, pass], () => {
            cy.visit('http://localhost:3000/#/auth');
            cy.get('[data-test-id=input]').should('be.visible').type(login);
            cy.get('[data-test-id=pass-input]').should('be.visible').type(pass);
            cy.get('[type=submit]').should('be.exist').click();
            cy.get('[data-test-id=main-page]').should('be.visible');
        });
    });

    it('test layout content view', () => {
        cy.viewport(1440, 900);
        cy.intercept('GET', /books/).as('books');
        cy.visit('http://localhost:3000');
        cy.wait('@books');
        cy.get('[data-test-id=button-menu-view-list]').should('be.exist').click();
        cy.get('[data-test-id=app]').screenshot('content-list', {
            clip: { x: 0, y: 0, width: 1440, height: 950 },
        });
        cy.get('[data-test-id=button-menu-view-window]').should('be.exist').click();
        cy.get('[data-test-id=app]').screenshot('content-window', {
            clip: { x: 0, y: 0, width: 1440, height: 950 },
        });
    });

    it('test layout book-page', () => {
        cy.viewport(1440, 900);
        cy.intercept('GET', /books/).as('books');
        cy.visit('http://localhost:3000');
        cy.wait('@books');
        cy.get('[data-test-id=card]').first().click();
        cy.get('[data-test-id=app]').screenshot('book-page', {
            clip: { x: 0, y: 0, width: 1440, height: 950 },
        });
    });

    it('test layout content view', () => {
        cy.viewport(768, 800);
        cy.intercept('GET', /books/).as('books');
        cy.visit('http://localhost:3000');
        cy.wait('@books');
        cy.get('[data-test-id=button-menu-view-list]').should('be.exist').click();
        cy.get('[data-test-id=app]').screenshot('content-list 768px', {
            clip: { x: 0, y: 0, width: 768, height: 1000 },
        });
        cy.get('[data-test-id=button-menu-view-window]').should('be.exist').click();
        cy.get('[data-test-id=app]').screenshot('content-window 768px', {
            clip: { x: 0, y: 0, width: 768, height: 1000 },
        });
    });

    it('test layout book-page', () => {
        cy.viewport(768, 800);
        cy.intercept('GET', /books/).as('books');
        cy.visit('http://localhost:3000');
        cy.wait('@books');
        cy.get('[data-test-id=card]').first().click();
        cy.get('[data-test-id=app]').screenshot('book-page 768px', {
            clip: { x: 0, y: 0, width: 768, height: 1000 },
        });
    });

    it('test layout content view', () => {
        cy.viewport(320, 600);
        cy.intercept('GET', /books/).as('books');
        cy.visit('http://localhost:3000');
        cy.wait('@books');
        cy.get('[data-test-id=button-menu-view-list]').should('be.exist').click();
        cy.get('[data-test-id=app]').screenshot('content-list 320px', {
            clip: { x: 0, y: 0, width: 320, height: 600 },
        });
        cy.get('[data-test-id=button-menu-view-window]').should('be.exist').click();
        cy.get('[data-test-id=app]').screenshot('content-window 320px', {
            clip: { x: 0, y: 0, width: 320, height: 600 },
        });
    });

    it('test layout book-page', () => {
        cy.viewport(320, 600);
        cy.intercept('GET', /books/).as('books');
        cy.visit('http://localhost:3000');
        cy.wait('@books');
        cy.get('[data-test-id=card]').first().click();
        cy.get('[data-test-id=app]').screenshot('book-page 320px', {
            clip: { x: 0, y: 0, width: 320, height: 600 },
        });
    });
});
