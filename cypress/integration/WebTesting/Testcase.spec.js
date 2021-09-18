// type definitions for Cypress object "cy"
/// <reference types="cypress" />

//Imports for Test Data and Page Objects
import * as data from '../../fixtures/WebAutomation.json';
import HomePage from '../PageObject/HomePage';
import TshirtPage from '../PageObject/TShirtPage';
import ContactUsPage from '../PageObject/ContactUsPage';
import CartPage from '../PageObject/CartPage';

describe('Automation for a Ecommerce Application Using Page Object Model', function () {
  let count = 0;
  const homePage = new HomePage();
  const tShirtPage = new TshirtPage();
  const contactUsPage = new ContactUsPage();
  const cartPage = new CartPage();

  beforeEach('Launch the Url',() => {
    cy.visit("http://automationpractice.com/index.php");
  });

  // This test validates the search and searched products
  it('Validate search suggestion is not given to user until 3 char are populated', function () {

    //verify the Search button functionality
    homePage.searchbox().type(data.searchtextNone);
    homePage.searchResult().should('not.exist');
    homePage.searchbox().clear().type(data.searchtext);
    homePage.searchResult().should('be.visible');
    homePage.searchbutton().should('be.enabled').click();

    // Test to verify the search related products are displayed
    // Scenario: Validate results are displayed according the search made by user.
    cy.get('.right-block h5 a').each(($el, index, $list) => {
      let producttext = $el.text().trim();
      expect(producttext).includes(data.searchtext);
    });
  });

    // This test validates the sorting of Large size products
  it('Validate user is able to apply the large size catalouge filter for T-shirt section', function () {

    //Click on Tshirt link from Home Page
    homePage.tShirtLink().click();

    //Click on Large Checkbox
    tShirtPage.largecheckbox().click();

    //Verify only one product is displayed
    tShirtPage.largeSizeProduct().should('be.visible');

  });

  // This test validates the file upload functionality
  it('Validate user is able to upload a file on contact us page.', function () {
    //Click on contact us link
    tShirtPage.contactUsLink().click();

    //Verify Attach file scenario
    const filepath = 'image1.jpeg';
    contactUsPage.fileUpload().attachFile(filepath);
    contactUsPage.fileName().should('contain.text', 'image1.jpeg');
  });

   // This test validates the Add to cart functionality
  it('Validate total cart amount and individual product price', function () {

    //Verify the number of products
    homePage.allProductsAddtocartBtn().should('have.length', 7);

    // Add 5 products to cart
    for (let i = 1; i <= data.productcount; i++) {
      homePage.allProductsAddtocartBtn().eq(i).click();
      homePage.continueShoppingBtn().click();
    };

    //Click on Cart Button
    homePage.cartBtn().click();

    // Verify the Price of all Items in cart with Total Price 
    // This method can me modified in POM
    cartPage.productPrice().each(($el, index, $list) => {

      cartPage.totalProducts().invoke('text').then((totalproductprice) => {
        cartPage.totalShipping().invoke('text').then((totalshippingprice) => {
          cartPage.totalPrice().invoke('text').then((totalPrice) => {
            let text = $el.text().trim().replace(/[^0-9.]/g, "");
            var value = parseFloat(text);
            count = count + value;

            let totalproducts = totalproductprice.trim().replace(/[^0-9.]/g, "")
            var tproduct = parseFloat(totalproducts);

            if (tproduct === count) {
              let totalshipping = totalshippingprice.trim().replace(/[^0-9.]/g, "")
              var tshiping = parseFloat(totalshipping);
              tproduct = tproduct + tshiping;
              let totalprice = totalPrice.trim().replace(/[^0-9.]/g, "")
              var total = parseFloat(totalprice);
              expect(tproduct).to.eq(total);
            };
          });
        });
      });
    });
  });
});
