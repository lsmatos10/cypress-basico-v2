describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', function() {
    
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('Preenche os campos obrigatórios', function(){
    cy.get('input[id="firstName"]')
      .should('be.visible')
      .type('Leonardo')
        
    cy.get('input[id="lastName"]')
      .should('be.visible')
      .type('Matos')

    cy.get('input[id="email"]')
      .should('be.visible')
      .type('lsmatos@acsp.com.br')
          
    cy.get('input[id="phone"]')
      .should('be.visible')
      .type('11999999')
        
  })
}) 

