describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'James Dean',
      username: 'james_dean',
      password: 'testPassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    const user2 = {
      name: 'Joe Dimaggio',
      username: 'joe_dimaggio',
      password: 'testPassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('james_dean')
      cy.get('#password').type('testPassword')
      cy.get('#login-button').click()
      cy.contains('james_dean logged in')
    })

    it('fails with incorrect credentials', function () {
      cy.get('#username').type('wrong_guy')
      cy.get('#password').type('testPassword')
      cy.get('#login-button').click()
      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'james_dean', password: 'testPassword' })
    })

    it('a blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('This is the title')
      cy.get('#author').type('Arthur Freely')
      cy.get('#url').type('www.urlName.com')
      cy.get('#submit-new-blog').click()
      cy.contains('a new blog "This is the title" by Arthur Freely added')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.contains('new blog').click()
        cy.createBlog({ title: 'This is the title', author: 'Arthur Freely', url: 'www.urlName.com' })
      })

      it('can be liked', function () {
        cy.contains('like').click()
        cy.contains('Likes: 1')
      })

      it('can be deleted', function () {
        cy.contains('delete').click()
        cy.contains('www.urlName.com').should('not.exist')
      })
    })

    describe('and multiple blogs exist', function () {
      beforeEach(function () {
        cy.contains('new blog').click()
        cy.createBlog({ title: 'First title', author: 'First author', url: 'www.firstUrl.com' })
        cy.createBlog({ title: 'Second title', author: 'Second author', url: 'www.SecondUrl.com' })
      })

      it('blogs are listed in order of likes', function () {
        cy.get('.like-btn').first().click()
        cy.get('.like-btn').last().click()
        cy.get('.like-btn').last().click()
        cy.get('.likes').then(num => {
          cy.wrap(num).eq(0).contains('Likes: 2')
          cy.wrap(num).eq(1).contains('Likes: 1')
        })
      })
    })
  })

  describe.only('when several blogs created by many people exist', function() {
    beforeEach(function() {
      cy.login({ username: 'james_dean', password: 'testPassword' })
      cy.createBlog({ title: 'Test title 1', author: 'First author', url: 'www.firstUrl.com/1' })
      cy.createBlog({ title: 'Test title 2', author: 'First author', url: 'www.firstUrl.com/2' })
      cy.contains('logout').click()
      cy.login({ username: 'joe_dimaggio', password: 'testPassword' })
      cy.createBlog({ title: 'Test title 3', author: 'Second author', url: 'www.firstUrl.com/3' })

      cy.contains('Test title 1').parent().as('blog1')
      cy.contains('Test title 2').parent().as('blog2')
      cy.contains('Test title 3').parent().as('blog3')
    })

    it('Blogs can be liked', function() {
      cy.get('@blog2').contains('like').click()
      cy.get('@blog2').contains('Likes: 1')
    })

    it('they are ordered by number of likes', function() {
      cy.get('@blog1').contains('like').as('like1')
      cy.get('@blog2').contains('like').as('like2')
      cy.get('@blog3').contains('like').as('like3')

      cy.get('@like2').click()
      cy.get('@like1').click()
      cy.get('@like1').click()
      cy.get('@like3').click()
      cy.get('@like3').click()
      cy.get('@like3').click()
      cy.get('@like3').click()

      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('Likes: 4')
        cy.wrap(blogs[1]).contains('Likes: 2')
        cy.wrap(blogs[2]).contains('Likes: 1')
      })
    })

    // it('the creator can delete a blog', function() {

    // })
  })
})
