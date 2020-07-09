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
    cy.contains('login').click()
    cy.get('#username').type('james_dean')
    cy.get('#password').type('testPassword')
    cy.get('#login-button').click()
    cy.contains('james_dean logged in')
  })
})