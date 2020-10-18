describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Testaaja',
      username: 'testaaja',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function () {
    cy.contains('blogs')
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
    //cy.contains('login').click()
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testaaja')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('Testaaja logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('väärä')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('wrong credentials')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('testaaja')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.get('#visibility-button').click()
      cy.get('#title-field').type('testiblogi')
      cy.get('#author-field').type('testibotti')
      cy.get('#url-field').type('testi.testi')
      cy.get('#blog-submit-button').click()

      cy.contains('new blog testiblogi by testibotti was added')
      cy.contains('title: testiblogi')
      cy.contains('author: testibotti')
      cy.contains('view').click()
    })

/*     it('A blog can be liked', function () {
      cy.get('#visibility-button').click()
      cy.get('#title-field').type('testiblogi')
      cy.get('#author-field').type('testibotti')
      cy.get('#url-field').type('testi.testi')
      cy.get('#blog-submit-button').click()

      cy.contains('new blog testiblogi by testibotti was added')
      cy.contains('title: testiblogi')
      cy.contains('author: testibotti')

      cy.get('#logout-button').click()
      cy.get('#username').type('testaaja')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
      cy.contains('view').click()
      cy.get('#like-blog-button').click()
      cy.contains('likes: 1')
    }) */

    it('A blog can be deleted', function () {


      cy.get('#visibility-button').click()
      cy.get('#title-field').type('testiblogi')
      cy.get('#author-field').type('testibotti')
      cy.get('#url-field').type('testi.testi')
      cy.get('#blog-submit-button').click()

      cy.contains('view').click()
      cy.get('#remove-blog-button').click()

      cy.contains('title: testiblogi').should('not.exist')
      cy.contains('author: testibotti').should('not.exist')
    })
  })
})