
import * as userdetails from './fixtures/Users.json'
// This function will return the random value with 7 character
export function randomStringValue(){
    const randomvalue = Math.random().toString(36).substring(7);
    return randomvalue;
}

//This function is to get the JWT Token based on the client configuration values.
export function getAccessToken() {
   // return new Promise(String)(function (resolve) {
        let endpoint = '/users';
        let access_token = '';
        let UserResponse = '';
      cy.request({
        method: 'POST',
        url: endpoint,
        body: {
            "firstName": userdetails.firstName,
            "lastName": userdetails.lastName,
            "email": `${randomStringValue()}${userdetails.email}`,
            "password": userdetails.password
        },
      }).then((response) => {
         UserResponse = JSON.parse(JSON.stringify(response));
         return response;
      });
    //   resolve(access_token : String);
    //   console.log(JSON.parse(JSON.stringify(response)));
    //});
  }