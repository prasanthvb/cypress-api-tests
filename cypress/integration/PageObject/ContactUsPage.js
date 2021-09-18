class ContactUsPage {

    fileUpload() {
        return cy.get('input[type="file"]')
    }
    fileName() {
        return cy.get('.filename')
    }
    homeLogo() {
        return cy.get('.logo')
    }

}
export default ContactUsPage;


