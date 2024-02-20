/// <reference types="cypress" />

beforeEach(function () {
  cy.viewport(1980, 880);
  cy.login();
});

it("Drag and drop ingeredient", () => {
  cy.get("p:contains(Флюоресцентная булка R2-D3)")
    .drag("p:contains(Необходимо добавить ингредиенты и булки.)")
    .then((success) => {assert.isTrue(success)})
});

it("create order", ()=>{
  cy.get("p:contains(Флюоресцентная булка R2-D3)")
  .drag("p:contains(Необходимо добавить ингредиенты и булки.)")
  cy.get("button:contains(Оформить заказ)")
  cy.wait(20)
  cy.get('dialog').
})