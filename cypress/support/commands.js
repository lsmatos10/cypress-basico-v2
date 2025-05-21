
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'John',
    lastName: 'Dowmn',
    email:'jogndown@example.com',
    tel: '1100000000',
    text: 'texto',

}) => {
    cy.get('input[id="firstName"]')
      .should('be.visible')
      .type(data.firstName)
        
    cy.get('input[id="lastName"]')
      .should('be.visible')
      .type(data.lastName)

    cy.get('input[id="email"]')
      .should('be.visible')
      .type(data.email)
          
    cy.get('input[id="phone"]')
      .should('be.visible')
      .type(data.tel)

    cy.get('textarea[row="6"]')
      .should('be.visible')
      .type(data.text)

})