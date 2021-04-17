beforeEach(() => {
  cy.task("resetDb");
});

it("hi", () => {
  assert.equal(1, 1);
});
