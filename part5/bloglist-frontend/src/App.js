import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [confirmationMessage, setConfirmationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs([...blogs, returnedBlog])
        setConfirmationMessage(`a new blog "${returnedBlog.title}" by ${returnedBlog.author} added`)
        setTimeout(() => {
          setConfirmationMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error)
        setErrorMessage('Blog creation failed')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const addLike = (id) => {
    const blog = blogs.find(b => b.id === id)
    const likedBlog = {
      ...blog, likes: blog.likes + 1, user: blog.user.id
    }
    blogService.update(id, likedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => id === b.id? returnedBlog : b))
      })
      .catch(error => {
        console.log(error)
      })
  }

  const deleteBlog = (id) => {
    const blog = blogs.find(b => b.id === id)

    blogService.remove(id)
      .then(response => {
        console.log(response)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      })
      .catch(error => {
        console.log(error)
      })
  }

  const blogsSorted = blogs.sort((a, b) => b.likes - a.likes)

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      <Notification message={confirmationMessage} />
      <div>{user.username} logged in</div>
      <button onClick={logout}>logout</button>
      <br /><br />
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <h3>current blogs</h3>
      {blogsSorted.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={() => addLike(blog.id)} deleteBlog={() => deleteBlog(blog.id)} />
      )}
    </div>
  )
}

export default App