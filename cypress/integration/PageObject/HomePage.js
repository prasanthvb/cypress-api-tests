class HomePage {

    searchbox() {
        return cy.get('[placeholder="Search"]')
    }
    searchbutton() {
        return cy.get('[name="submit_search"]')
    }
    productName() {
        return cy.get('.right-block h5 a')
    }

    tShirtLink() {
        return cy.get('.sf-menu > :nth-child(3) > a')
    }

    allProductsAddtocartBtn() {
        return cy.get('[title="Add to cart"]:visible')
    }

}
export default HomePage;


