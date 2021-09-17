class TshirtPage {

    largecheckbox() {
        return cy.get('#layered_id_attribute_group_3')
    }
    largeSizeProduct() {
        return cy.get('.product_img_link')
    }
    contactUsLink() {
        return cy.get('#contact-link > a')
    }

}
export default TshirtPage;


