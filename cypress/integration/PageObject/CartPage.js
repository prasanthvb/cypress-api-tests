class CartPage {

    productPrice() {
        return cy.get('.cart_total> .price')
    }
    totalProducts() {
        return cy.get('#total_product')
    }
    totalShipping() {
        return cy.get('#total_shipping')
    }

    totalTax(){
        return cy.get('#total_tax')
    }

    totalPrice(){
        return cy.get('#total_price')
    }
}
export default CartPage;


