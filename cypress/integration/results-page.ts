export {}; // error "All files must be modules when isolatedModules flag is provided"
describe('Results page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // having it read from the index component since we only have one next page as of now
  it('should have the text queue', () => {
    cy.contains('queue');
  });
});
