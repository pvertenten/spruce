/// <reference types="Cypress" />
/// <reference path="../support/index.d.ts" />

describe("Auth", function() {
  it("Unauthenticated user is redirected to login page after visiting a private route", function() {
    cy.visit("/patch/123123");
    cy.url().should("include", "/login");
  });

  it("Redirects user back to the route they were trying to visit after login", function() {
    cy.enterLoginCredentials();
    cy.url().should("include", "/patch/123123");
  });

  it("Automatically authenticates user if they are logged in", function() {
    cy.visit("/patch/123123");
    cy.url().should("include", "/patch/123123");
  });

  it("Redirects user to /login after logging out", function() {
    cy.login();
    cy.get("div[id=logout]").click();
    cy.url().should("include", "/login");
  });

  it("Redirects user to home page by default if no previous referer", function() {
    cy.login();
    cy.url().should("include", "/my-patches");
  });

  it("Redirects user to /my-patches if they are already logged in and visit login page", function() {
    cy.login();
    cy.visit("/login");
    cy.url().should("include", "/my-patches");
  });
});
