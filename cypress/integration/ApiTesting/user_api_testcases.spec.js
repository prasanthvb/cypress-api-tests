// Imports
import * as userdetails from '../../fixtures/Users.json'
import {
  randomStringValue
} from '../../Utility'

// Global Variables 
let createNewUserResponse = Cypress.Response;
let NewUserResponse = Cypress.Response;
let NewUserInvalidResponse = Cypress.Response;
let emailValue = '';
let access_token = '';

// Test suite to create and verify the User details
describe('Create a user and verify the user data', function () {
  
  // Testcase_1 : Use POST method to Create the User
  it('Create the user using POST method', () => {
    let endpoint = '/users';
    emailValue = `${randomStringValue()}${userdetails.email}`;
    let requestbody = {
      "firstName": userdetails.firstName,
      "lastName": userdetails.lastName,
      "email": emailValue,
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
        expect(createNewUserResponse.status).to.eq(Cypress.env('validStatusCode1'));
        expect(createNewUserResponse.body).to.not.be.null;
      });
  });

  // Testcase_2 : Use GET method to Verify the created user details in response
  it('Verify the created user data using GET method', () => {
    let endpoint = 'users/me';
    access_token = createNewUserResponse.body.token;
    cy.request({
      method: 'GET',
      url: endpoint,
      headers: {
        'Authorization': 'Bearer ' + access_token,
      }
    })
      .then((response) => {
        NewUserResponse = JSON.parse(JSON.stringify(response));
        expect(NewUserResponse.status).to.eq(Cypress.env('validStatusCode'));
        expect(NewUserResponse.body).to.not.be.null;
        expect(NewUserResponse.body.firstName).to.eq(userdetails.firstName);
        expect(NewUserResponse.body.lastName).to.eq(userdetails.lastName);
        expect(NewUserResponse.body.email).to.eq(emailValue);
      });
  });

  // Testcase_3 : Verify the created user details are not empty in response
  it('Verify that the created user fields are not empty', () => {
    expect(NewUserResponse.body._id).to.not.be.null;
    expect(NewUserResponse.body.firstName).to.not.be.null;
    expect(NewUserResponse.body.lastName).to.not.be.null;
    expect(NewUserResponse.body.email).to.not.be.null;
  });

  // Testcase_4 : Validate user is not able to fetch user details with invalid token
  it('Verify user is not able to fetch user details with invalid token', () => {
    let endpoint = 'users/me';
    access_token = createNewUserResponse.body.token;
    cy.request({
      method: 'GET',
      url: endpoint,
      failOnStatusCode: false,
      headers: {
        'Authorization': 'Bearer ' + access_token + randomStringValue(),
      }
    })
      .then((response) => {
        NewUserInvalidResponse = JSON.parse(JSON.stringify(response));
        expect(NewUserInvalidResponse.status).to.eq(Cypress.env('invalidStatusCode1'));
      });
  });
});
