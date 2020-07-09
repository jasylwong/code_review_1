describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'James Dean',
      username: 'james_dean',
      password: 'testPassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('james_dean')
      cy.get('#password').type('testPassword')
      cy.get('#login-button').click()
      cy.contains('james_dean logged in')
    })

    it('fails with incorrect credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('wrong_guy')
      cy.get('#password').type('testPassword')
      cy.get('#login-button').click()
      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('james_dean')
      cy.get('#password').type('testPassword')
      cy.get('#login-button').click()
    })

    it('a blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('This is the title')
      cy.get('#author').type('Arthur Freely')
      cy.get('#url').type('www.urlName.com')
      cy.get('#submit-new-blog').click()
      cy.contains('a new blog "This is the title" by Arthur Freely added')
    })

    describe.only('and a blog exists', function() {
      beforeEach(function() {
        cy.contains('new blog').click()
        cy.get('#title').type('This is the title')
        cy.get('#author').type('Arthur Freely')
        cy.get('#url').type('www.urlName.com')
        cy.get('#submit-new-blog').click()
      })

      it('can be liked', function() {
        cy.contains('like').click()
        cy.contains('Likes: 1')
      })

      it('can be deleted', function() {
        cy.contains('delete').click()
        cy.contains('www.urlName.com').should('not.exist')
      })
    })
  })
})