// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
Cypress.Commands.add('getProductName', (productName) => {
   cy.get('.right-block h5 a').each(($el, index, $list) => {
      $el.text().includes(productName);
   })
})

let count = 0;
Cypress.Commands.add('countPrice', () => {
   cy.get('.cart_total> .price').each(($el, index, $list) => {
    let text= $el.text().trim().replace(/[^0-9.]/g, "");
    var value = parseFloat(text);
    count= count + value;  
})
return count;
})
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-file-upload';

Cypress.Commands.add('get_token', (requestbody) => {
   // var response = ""
   cy.request({
      method: 'POST',
      url: Cypress.env("domainUrl") + "users",
      failOnStatusCode: false,
      json: true,
      form: true,
      body: requestbody,
   }).then((response) => {
      //  token = response.body.token;
      return response;
   })
})