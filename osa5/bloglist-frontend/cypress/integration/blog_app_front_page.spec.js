describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Testaaja',
      username: 'testaaja',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  
    it('Login from is shown', function() {
        cy.contains('blogs')
        cy.contains('Login')
        cy.contains('username')
        cy.contains('password')
        //cy.contains('login').click()
    })

   describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testaaja')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('Testaaja logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('väärä')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('wrong credentials')
    })
  }) 
})