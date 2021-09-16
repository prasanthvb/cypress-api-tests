
import * as userdetails from '../../fixtures/Users.json'
 import {
   randomStringValue
 } from '../../Utility'
 let createNewUserResponse = Cypress.Response;
describe('A simple GET request', function () {

  it('POST -- Successful POST request', () => {
    let endpoint = '/users';
    let requestbody = {
      "firstName": userdetails.firstName,
      "lastName": userdetails.lastName,
      "email": `${randomStringValue()}${userdetails.email}`,
      "password": userdetails.password
    }
    cy.request({
      method: 'POST',
      url: endpoint,
      failOnStatusCode: false,
      body: requestbody
    })
      .then((response) => {
         createNewUserResponse = JSON.parse(JSON.stringify(response));
        expect(createNewUserResponse.status).to.eq(201)
        expect(createNewUserResponse.body).to.not.be.null;
      });
  });


  it('GET -- Successful GET request', () => {
    let endpoint = '/me';
   // cy.log(createNewUserResponse.body.token)
    const token1 = createNewUserResponse.body.token;
    const authorization = `Bearer ${ token1 }`;
    const options = {
      method: 'GET',
      url: endpoint,
      headers: {
        'Authorization' : 'Bearer '+{token1}
      }
    }
      cy.request(options)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.not.be.null
        cy.log(JSON.parse(JSON.stringify(response.body)))
      });
  });
});
