// Imports
import * as userdetails from '../../fixtures/Users.json'
import * as contactdetails from '../../fixtures/Contact.json'
import {
  randomStringValue,
} from '../../Utility'

// Global Variables 
let createNewUserResponse = Cypress.Response;
let createNewContactResponse = Cypress.Response;
let updateContactResponse = Cypress.Response;
let ContactResponse = Cypress.Response;
let emailValue = '';
let access_token = '';
let contactID = '';

// Test suite to create and verify the Customer details
describe('Create a Customer and verify the Customer data', function () {

  // Before Method : Use POST method to Create the User along with Access Token
  // This method can be simplified through command.js
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
      body: requestbody
    })
      .then((response) => {
        createNewUserResponse = JSON.parse(JSON.stringify(response));
        expect(createNewUserResponse.status).to.eq(Cypress.env('validStatusCode1'));
        access_token = createNewUserResponse.body.token;
      });
  });

  // This test method will create the new contact
  it('Create the contact using POST method', () => {
    let endpoint = '/contacts';
    cy.request({
      method: 'POST',
      url: endpoint,
      headers: {
        'Authorization': 'Bearer ' + access_token,
      },
      body: contactdetails.contactBody,
    })
      .then((response) => {
        createNewContactResponse = JSON.parse(JSON.stringify(response));
        expect(createNewContactResponse.status).to.eq(Cypress.env('validStatusCode1'));
        contactID = createNewContactResponse.body._id;
      });
  });


  // Test case to update the contact and very the changes - First Name , Last name and DOB is updated here
  it('Update the contact details and verify the changes', () => {
    let endpoint = '/contacts/' + contactID;
    cy.request({
      method: 'PUT',
      url: endpoint,
      headers: {
        'Authorization': 'Bearer ' + access_token,
      },
      body: contactdetails.updateContactBody,
    })
      .then((response) => {
        updateContactResponse = JSON.parse(JSON.stringify(response));
        expect(updateContactResponse.status).to.eq(Cypress.env('validStatusCode'));
        expect(updateContactResponse.body.firstName).to.not.eq(createNewContactResponse.body.firstName);
        expect(updateContactResponse.body.lastName).to.not.eq(createNewContactResponse.body.lastName);
        expect(updateContactResponse.body.birthdate).to.not.eq(createNewContactResponse.body.birthdate);
      });
  });

  //  This test will delete the created contant
  it('Delete the created contact and verify the contact is deleted', () => {
    let endpoint = '/contacts/' + contactID;
    cy.request({
      method: 'DELETE',
      url: endpoint,
      headers: {
        'Authorization': 'Bearer ' + access_token,
      },
    })
      .then((response) => {
        ContactResponse = JSON.parse(JSON.stringify(response));
        expect(ContactResponse.status).to.eq(Cypress.env('validStatusCode'));
        expect(ContactResponse.body).to.eq(Cypress.env('deleteContactMessage'));
      });
  });

  //  This test verify the GET throws error for deleted contact
  it('Get Contact API returns error while fetching the deleted contact ', () => {
    let endpoint = '/contacts/' + contactID;
    cy.request({
      method: 'GET',
      url: endpoint,
      failOnStatusCode: false,
      headers: {
        'Authorization': 'Bearer ' + access_token,
      },
    })
      .then((response) => {
        ContactResponse = JSON.parse(JSON.stringify(response));
        expect(ContactResponse.status).to.eq(Cypress.env('invalidStatusCode2'));
      });
  });
});
