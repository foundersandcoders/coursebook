describe("homepage", () => {
  it("has correct title", () => {
    // we set baseURL to http://localhost:4444 in cypress.json
    // so we don't have to write it every time
    cy.visit("/");
    cy.get("h1").contains("Welcome to my site");
  });

  it("has link to about page", () => {
    cy.visit("/");
    cy.get("nav").find("a").contains("About").click();
    cy.url().should("include", "/about");
    cy.get("h1").contains("About this site");
  });

  it("has link to sign-up page", () => {
    cy.visit("/");
    cy.get("nav").find("a").contains("Sign up").click();
    cy.url().should("include", "/sign-up");
    cy.get("h1").contains("Sign up");
  });
});

describe("sign up page", () => {
  it("has a working form", () => {
    cy.visit("/sign-up");
    cy.get("form").find("input[name='email']").type("oli@test.com");
    cy.get("form").find("input[name='password']").type("hunter2");
    cy.get("form").find("button").click();
    cy.url().should("include", "/welcome");
  });

  // bonus test for validation
  // since we're using <input type="email">
  // the browser should check the user actually typed one
  it("rejects invalid submissions", () => {
    cy.visit("/sign-up");
    cy.get("form").find("input[name='email']").type("not an email");
    cy.get("form").find("button").click();

    // we should have one invalid input—the email field
    // (this is a CSS selector using the :invalid pseudoclass)
    cy.get("input:invalid").should("have.length", 1);

    // we should not have redirected
    cy.url().should("include", "/sign-up");
  });
});
