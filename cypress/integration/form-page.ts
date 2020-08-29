export {}; // error "All files must be modules when isolatedModules flag is provided"
describe('Form page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // this will pass tests but since there is no form page, rather
  // only a form component, we will have to see if we can pass in
  // a fake access token for it to actual render the form component
  it('should have the text playlist and queue', () => {
    cy.contains('playlist');
    cy.contains('queue');
  });
});
