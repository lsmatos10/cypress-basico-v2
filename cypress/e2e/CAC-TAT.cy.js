describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', function() {
    
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('Preenche os campos obrigatórios', function(){
    const longText = Cypress._.repeat('abcdefghijklmnoepqrstuvwxyz')
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

    cy.get('textarea[row="6"]')
      .should('be.visible')
      .type(longText, { delay: 0})

    cy.get('button[type="submit"]')
      .click()

  
    //cy.contains('strong', 'Mensagem enviada com sucesso.')
    // .should('be.visible');

        
  })

  it('EXIBE MENSAGEM DE ERRO COM EMAIL INVALIDO', function(){
    cy.get('input[id="firstName"]')
      .should('be.visible')
      .type('Leonardo')
        
    cy.get('input[id="lastName"]')
      .should('be.visible')
      .type('Matos')

    cy.get('input[id="email"]')
      .should('be.visible')
      .type('lsmatos')
          
    cy.get('input[id="phone"]')
      .should('be.visible')
      .type('11999999')

    cy.get('textarea[row="6"]')
      .should('be.visible')
      .type('Teste')

    cy.get('button[type="submit"]')
      .click()

    cy.contains('strong', 'Valide os campos obrigatórios!').should('be.visible');


  })
    it('Valide o campo telefone, só aceite numero ', function(){
  
  
          
    cy.get('input[id="phone"]')
    .type('abcde')
      .should('have.value', '')


    cy.get('button[type="submit"]')
      .click()
  })
  it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        
    cy.get('input[id="firstName"]')
      .should('be.visible')
      .type('Leonardo')
        
    cy.get('input[id="lastName"]')
      .should('be.visible')
      .type('Matos')

    cy.get('input[id="email"]')
      .should('be.visible')
      .type('lsmatos')
          
    //cy.get('input[id="phone"]')
      //.should('be.visible')
     // .type('11999999')

    cy.get('textarea[row="6"]')
      .should('be.visible')
      .type('Teste')

    cy.get('input[id="phone-checkbox"]')
      .check()
      .should('be.checked')

    cy.get('button[type="submit"]')
      .click()

    cy.contains('strong', 'Valide os campos obrigatórios!')
      .should('be.visible');

      })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    cy.get('input[id="firstName"]')
      .should('be.visible')
      .type('Leonardo')
      .clear()
      .should('have.value', '')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    
    cy.fillMandatoryFieldsAndSubmit()//preencha os campos obrigatorios e envie

    cy.get('button[type="submit"]')
      .click()
    cy.get('.success')
      .should('be.visible')
  })
  it('Encontrando elemento através do contains', () => { //Sempre utilizar o contains para identificar um elemento que não tenha id
    cy.fillMandatoryFieldsAndSubmit()
    
    cy.contains('button', 'Enviar').click()
    cy.contains('strong', 'Mensagem enviada com sucesso.')
      .should('be.visible');
  })
//Aula 3: Selecionando opções em campos de seleção suspensa
  it('Utilizar o Select', () => {
    //cy.get('select')
    //  .select('Cursos')
    //  .should('have.value', 'cursos') //Seleção pelo texto que o usuario vê
    //cy.get('select')
    //  .select('blog')
    //  .should('have.value', 'blog')  //Seleção pelo value 
    cy.get('select')
      .select(3)
      .should('have.value', 'mentoria') //Seleção pelo índice 1(posicao)

    //Se o select for de multiplas escolhasm deverá ser listado-os em um array
  })
//Aula 4: Marcando inputs tipo Radio
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked') //para falhar colocar not.be.checked
  })
  it('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(type0fService => {
        cy.wrap(type0fService)
        .check()
        .should('be.checked')
      })
      //.should('be.checked') //para falhar colocar not.be.checked
  })
//Aula5: Marcando e Desmarcando campos do tipo caixa de seleção
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last() //pega o ultimo
      .uncheck()
      .should('not.be.checked')
  })
}) 

