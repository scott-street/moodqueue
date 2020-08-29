export {}; // error "All files must be modules when isolatedModules flag is provided"
describe('Results page', () => {
  beforeEach(() => {
    cy.visit('/results');
  });

  it('should have the text Results Page', () => {
    cy.contains('Results Page');
  });
});
