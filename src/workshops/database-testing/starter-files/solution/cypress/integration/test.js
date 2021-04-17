beforeEach(() => {
  cy.task("resetDb");
});

describe("list users", () => {
  it("displays a list of users", () => {
    cy.visit("/");
    cy.contains("Sery1976");
    cy.contains("Spont1935");
  });
});

describe("create users", () => {
  it("can create a new user", () => {
    cy.visit("/");
    cy.contains("New user").click();
    cy.url().should("include", "/users/create");
    cy.get("input[name='username'").type("oli");
    cy.get("input[name='age'").type("12");
    cy.get("input[name='location'").type("essex");
    cy.get("button[type='submit']").click();
    cy.contains("oli");
  });
});

describe("delete users", () => {
  it("can delete a user", () => {
    cy.visit("/");
    cy.get("button[aria-label='Delete Sery1976'").click();
    cy.contains("Sery1976").should("not.exist");
  });
});
