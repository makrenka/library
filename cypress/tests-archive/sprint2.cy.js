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

    it('test layout burger-menu', () => {
      cy.viewport(1440, 900);
        cy.intercept('GET', /books/).as('books');
        cy.visit('http://localhost:3000');
        cy.wait('@books');
        cy.get('[data-test-id=button-burger]').should('not.be.visible');
        cy.get('[data-test-id=app]').screenshot('app', {
          clip: { x: 0, y: 0, width: 1440, height: 2000 },
      });
    });

    it('test slider', () => {
      cy.viewport(1440, 900);
        cy.intercept('GET', /books/).as('books');
        cy.visit('http://localhost:3000');
        cy.wait('@books');
        cy.get('[data-test-id=card]').eq(133).should('be.exist').click();
        cy.get('[data-test-id=app]').screenshot('slider not foto 1440px', {
            clip: { x: 0, y: 0, width: 1440, height: 950 },
        });
        cy.visit('http://localhost:3000');
        cy.wait('@books');
        cy.get('[data-test-id=card]').eq(1).should('be.exist').click();
        cy.get('[data-test-id=app]').screenshot('slider one foto 1440px', {
            clip: { x: 0, y: 0, width: 1440, height: 950 },
        });
        cy.visit('http://localhost:3000');
        cy.wait('@books');
        cy.get('[data-test-id=card]').eq(4).should('be.exist').click();
        cy.get('[data-test-id=app]').screenshot('slider more two foto 1440px', {
            clip: { x: 0, y: 0, width: 1440, height: 950 },
        });
        cy.get('[data-test-id=slide-big]').screenshot('slider before 1440px');
        cy.get('[data-test-id=slide-mini]')
            .get('.swiper-slide-visible')
            .eq(1)
            .should('be.exist')
            .click();
        cy.get('[data-test-id=slide-big]').screenshot('slider after 1440px');
    });

    it('test button comment view', () => {
      cy.viewport(1440, 900);
        cy.intercept('GET', /books/).as('books');
        cy.visit('http://localhost:3000');
        cy.wait('@books');
        cy.get('[data-test-id=card]').first().click();
        cy.get('[data-test-id=button-hide-reviews]').should('be.exist').click();
        cy.get('[data-test-id=app]').screenshot('book-page comment collapse');
        cy.get('[data-test-id=button-hide-reviews]').click();
        cy.get('[data-test-id=app]').screenshot('book-page comment expand');
    });

    it('test navigation view', () => {
      cy.viewport(1440, 900);
        cy.intercept('GET', /books/).as('books');
        cy.visit('http://localhost:3000');
        cy.wait('@books');
        cy.get('[data-test-id=navigation-showcase]').should('be.exist').click();
        cy.get('[data-test-id=navigation-books]').should('not.be.visible');
        cy.get('[data-test-id=navigation-showcase]').click();
        cy.get('[data-test-id=navigation-books]').should('be.visible').should('be.exist');
        cy.get('[data-test-id=navigation-terms]').should('be.exist').eq(1).click();
        cy.get('[data-test-id=navigation-books]').should('not.be.visible');
    });

    it('test layout burger-menu', () => {
        cy.viewport(768, 800);
        cy.intercept('GET', /books/).as('books');
        cy.visit('http://localhost:3000');
        cy.wait('@books');
        cy.get('[data-test-id=button-burger]').should('be.visible');
        cy.get('[data-test-id=app]').screenshot('app 768px', {
            clip: { x: 0, y: 0, width: 768, height: 1000 },
        });
        cy.get('[data-test-id=button-burger]').should('be.exist').click();
        cy.get('[data-test-id=app]').screenshot('app burger-menu open 768px', {
            clip: { x: 0, y: 0, width: 768, height: 1000 },
        });
        cy.get('[data-test-id=button-burger]').click();
        cy.get('[data-test-id=app]').screenshot('app burger-menu close 768px', {
            clip: { x: 0, y: 0, width: 768, height: 1000 },
        });
        cy.get('[data-test-id=button-burger]').click();
        cy.get('[data-test-id=app]').click(310, 20, { force: true });
        cy.get('[data-test-id=app]').screenshot(
            'app burger-menu close click not burger-menu 768px',
            {
                clip: { x: 0, y: 0, width: 1440, height: 1000 },
            },
        );
    });

    it('test slider', () => {
        cy.viewport(768, 800);
        cy.intercept('GET', /books/).as('books');
        cy.visit('http://localhost:3000');
        cy.wait('@books');
        cy.get('[data-test-id=card]').eq(133).click();
        cy.get('[data-test-id=app]').screenshot('slider not foto 768px', {
            clip: { x: 0, y: 0, width: 768, height: 550 },
        });
        cy.visit('http://localhost:3000');
        cy.wait('@books');
        cy.get('[data-test-id=card]').eq(1).click();
        cy.get('[data-test-id=app]').screenshot('slider one foto 768px', {
            clip: { x: 0, y: 0, width: 768, height: 550 },
        });
        cy.visit('http://localhost:3000');
        cy.wait('@books');
        cy.get('[data-test-id=card]').eq(4).click();
        cy.get('[data-test-id=app]').screenshot('slider more two foto 768px', {
            clip: { x: 0, y: 0, width: 768, height: 550 },
        });
        cy.get('[data-test-id=slide-big]').screenshot('slider before 768px');
        cy.get('.swiper-pagination-bullet').eq(1).should('be.exist').click();
        cy.get('[data-test-id=slide-big]').screenshot('slider after 768px');
    });

    it('test navigation view', () => {
        cy.viewport(768, 800);
        cy.intercept('GET', /books/).as('books');
        cy.visit('http://localhost:3000');
        cy.wait('@books');
        cy.get('[data-test-id=button-burger]').click();
        cy.get('[data-test-id=burger-showcase]').should('be.exist').click();
        cy.get('[data-test-id=burger-books]').should('not.be.visible');
        cy.get('[data-test-id=burger-showcase]').click();
        cy.get('[data-test-id=burger-books]').should('be.visible').should('be.exist');
        cy.get('[data-test-id=navigation-terms]').should('be.exist').eq(0).click();
        cy.get('[data-test-id=burger-books]').should('not.be.visible');
    });

    it('test layout burger-menu', () => {
        cy.viewport(320, 600);
        cy.intercept('GET', /books/).as('books');
        cy.visit('http://localhost:3000');
        cy.wait('@books');
        cy.get('[data-test-id=button-burger]').should('be.visible');
        cy.get('[data-test-id=app]').screenshot('app 320px', {
            clip: { x: 0, y: 0, width: 320, height: 600 },
        });
        cy.get('[data-test-id=button-burger]').click();
        cy.get('[data-test-id=app]').screenshot('app burger-menu open 320px', {
            clip: { x: 0, y: 0, width: 320, height: 600 },
        });
        cy.get('[data-test-id=button-burger]').click();
        cy.get('[data-test-id=app]').screenshot('app burger-menu close 320px', {
            clip: { x: 0, y: 0, width: 320, height: 600 },
        });
        cy.get('[data-test-id=button-burger]').click();
        cy.get('[data-test-id=app]').click(310, 20, { force: true });
        cy.get('[data-test-id=app]').screenshot(
            'app burger-menu close click not burger-menu 320px',
            {
                clip: { x: 0, y: 0, width: 320, height: 600 },
            },
        );
    });

    it('test slider', () => {
        cy.viewport(320, 600);
        cy.intercept('GET', /books/).as('books');
        cy.visit('http://localhost:3000');
        cy.wait('@books');
        cy.get('[data-test-id=card]').eq(133).click();
        cy.get('[data-test-id=app]').screenshot('slider not foto 320px', {
            clip: { x: 0, y: 0, width: 320, height: 600 },
        });
        cy.get('[data-test-id=breadcrumbs-link]').click();
        cy.get('[data-test-id=card]').eq(1).click();
        cy.get('[data-test-id=app]').screenshot('slider one foto 320px', {
            clip: { x: 0, y: 0, width: 320, height: 600 },
        });
        cy.get('[data-test-id=breadcrumbs-link]').click();
        cy.get('[data-test-id=card]').eq(4).click();
        cy.get('[data-test-id=app]').screenshot('slider more two foto 320px', {
            clip: { x: 0, y: 0, width: 320, height: 600 },
        });
        cy.get('[data-test-id=slide-big]').screenshot('slider before 320px');
        cy.get('.swiper-pagination-bullet').eq(1).click();
        cy.get('[data-test-id=slide-big]').screenshot('slider after 320px');
    });

    it('test search', () => {
        cy.viewport(320, 600);
        cy.intercept('GET', /books/).as('books');
        cy.visit('http://localhost:3000');
        cy.wait('@books');
        cy.get('[data-test-id=input-search]').should('not.be.visible');
        cy.get('[data-test-id=button-search-open]').should('be.exist').click();
        cy.get('[data-test-id=input-search]').should('be.visible');
        cy.get('[data-test-id=button-search-close]').should('be.exist').click();
        cy.get('[data-test-id=input-search]').should('not.be.visible');
    });
});
