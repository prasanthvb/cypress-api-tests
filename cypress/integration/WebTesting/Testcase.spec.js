// type definitions for Cypress object "cy"
/// <reference types="cypress" />
import * as data from '../../fixtures/WebAutomation.json';
import HomePage from '../PageObject/HomePage';
import TshirtPage from '../PageObject/TShirtPage';
import ContactUsPage from '../PageObject/ContactUsPage';

describe('Automation for a Ecommerce Application Using Page Object Model', function () {
  it('UI Testing of Automation Practice Web Application E2E', function () {
    //Create Objects
    const homePage = new HomePage();
    const tShirtPage = new TshirtPage();
    const contactUsPage = new ContactUsPage();
    cy.visit("http://automationpractice.com/index.php");

    //verify the Search button functionality
    homePage.searchbox().type(data.searchtext);
    homePage.searchbutton().should('not.be.disabled');
    homePage.searchbutton().should('be.enabled').click();

    // Test to verify the search related products are displayed
    cy.getProductName(data.searchtext);

    //Click on Tshirt link from Home Page
    homePage.tShirtLink().click();

    //Click on Large Checkbox
    tShirtPage.largecheckbox().click();

    //Verify only one product is displayed
    tShirtPage.largeSizeProduct().should('be.visible');

    //Click on contact us link
    tShirtPage.contactUsLink().click();

    //Verify Attach file scenario
    const filepath = 'image1.jpeg';
    contactUsPage.fileUpload().attachFile(filepath);
    contactUsPage.fileName().should('contain.text', 'image1.jpeg');

    //click on Home Logo
    contactUsPage.homeLogo().click();

    //Verify the nu,ber of products
    homePage.allProductsAddtocartBtn().should('have.length', 7);

    cy.addToCart();

  });
});
