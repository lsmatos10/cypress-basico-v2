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
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        
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

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
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

  //Aula 7: Fazendo upload de arquivos
  it('Seleciona um arquivo da pasta fixtures', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('input[id="file-upload"]')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
          //console.log(input[0].files[0].name)
          expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('Seleciona um arquivo simulando um drag-and-drop "Arrastando arquivo"', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('input[id="file-upload"]')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'}) //drag-drop o sistema estaria arrastando
      .should(input => {
          expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it(' Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile') //Arquivo fica encadeado
    cy.get('input[id="file-upload"]')
      .selectFile('@sampleFile')
      .should(input => {
          expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  // Aula 8: Lidando com links que abrem em outra aba do navegador
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique ', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

      cy.contains('h1', 'CAC TAT - Política de privacidade')
        .should('be.visible')
  })
}) 

