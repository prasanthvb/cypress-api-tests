class HomePage {

    searchbox() {
        return cy.get('[placeholder="Search"]')
    }
    searchbutton() {
        return cy.get('[name="submit_search"]')
    }

    searchResultNone() {
        return cy.get('.ac_results[style*="display: none"]')
    }

    searchResult() {
        return cy.get('.ac_results')
    }

    productName() {
        return cy.get('.right-block h5 a')
    }

    tShirtLink() {
        return cy.get('.sf-menu > :nth-child(3) > a')
    }

    allProductsAddtocartBtn() {
        return cy.get('.ajax_add_to_cart_button:visible')
    }

    continueShoppingBtn() {
        return cy.get('.continue > span')
    }

    cartBtn() {
        return cy.get('[title="View my shopping cart"]')
    }
    
}
export default HomePage;


