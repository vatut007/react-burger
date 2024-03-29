/// <reference types="cypress" />
import "@4tw/cypress-drag-drop";
import { testUrl } from "../constants/constants";

Cypress.Commands.add('login', () => {
    Cypress.log({
      name: 'loginBySingleSignOn',
    });
    // Авторизуемся
      cy.visit(`${testUrl}/login`);
      cy.get('input[name=email]').next().click()
      cy.get('form').within(($form)=>{
        cy.get('input[name=email]').type("test2@example.com")
        cy.get('input[name=password]').type("password")
      })
      cy.get('button[type=submit]').click()
      cy.wait(10)
    });