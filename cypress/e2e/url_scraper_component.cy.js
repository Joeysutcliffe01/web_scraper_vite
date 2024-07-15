/* eslint-disable no-undef */
describe('Test for scraper component', () => {

  beforeEach(() => {

    // Visit dev env
    cy.visit('http://localhost:5173/')
    
  })


  it('should have url already in the input field', () => {

      // Make sure default url is correct
      cy.get('[data-testid="searchbox-input-field"]').should("exist").should("have.value", "https://news.ycombinator.com/")

  })

  it('should render scraped data when the btn is clicked', () => {
      // Click the scrape button to fetch data
      cy.get('[data-testid="searchbox-btn"]').click()

      // wait for the data to be rendered
      cy.wait(500)
      
      // Make sure li item is rendered
      cy.get('[data-testid="scraped-data-li 1"]').should("exist") 

  })

  it('should filter data by comments and ensure first li comments are greater than the second li comments', () => {
    // Click the scrape button to fetch data
    cy.get('[data-testid="searchbox-btn"]').click();

    // Wait for data to be fetched and rendered
    cy.get('ul').children().should('have.length.at.least', 2);

    // Filter by comments (More than 5 words)
    cy.get('[data-testid="filter-btn"]').click();
    cy.get('[data-testid="more-than-5"]').click();

    // Check the comments order
    cy.get('ul > li').then(items => {
      if (items.length >= 2) {
        const firstComments = parseInt(items[0].querySelector('[data-testid="comments"]').textContent.split(': ')[1]);
        const secondComments = parseInt(items[1].querySelector('[data-testid="comments"]').textContent.split(': ')[1]);
        
        expect(firstComments).to.be.greaterThan(secondComments);
      } else {
        // Skip the check if there are not enough items
        cy.log('Not enough items to compare comments');
      }
    });
  });

  it('should filter data by points and ensure first li points are greater than the second li points', () => {
    // Click the scrape button to fetch data
    cy.get('[data-testid="searchbox-btn"]').click();

    // Wait for data to be fetched and displayed
    cy.get('ul').children().should('have.length.at.least', 2); // Ensure at least 2 items are present for the test

    // Filter by points (5 words or less)
    cy.get('[data-testid="filter-btn"]').click();
    cy.get('[data-testid="less-than-5"]').click();

    // Check the points order for "5 words or less"
    cy.get('ul > li').then(items => {
      if (items.length >= 2) {
        const firstPoints = parseInt(items[0].querySelector('[data-testid="points"]').textContent.split(': ')[1]);
        const secondPoints = parseInt(items[1].querySelector('[data-testid="points"]').textContent.split(': ')[1]);
        
        expect(firstPoints).to.be.greaterThan(secondPoints);
      } else {
        // Skip the check if there are not enough items
        cy.log('Not enough items to compare points for "5 words or less" filter');
      }
    });
  });
  
})