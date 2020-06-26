const supertest = require("supertest")
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require("../app")
const api = supertest(app)

const Blog = require("../models/blog")
const User = require("../models/user")

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany()

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('when some blogs are saved', () => {
  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('id field is properly named', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined();
  })
})

describe('when a blog is posted to api', () => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: 'janedoez',
      name: 'Jane Doe',
      password: 'password'
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      'Authorization': `bearer ${result.body.token}`
    }
  })

  test('it is saved to db when valid', async () => {
    const newBlog = {
      title: "Testing valid blog can be added with token",
      author: "Jason Wong",
      url: "http://www.testingvalidblogcanbeadded.html",
      likes: 5,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain(newBlog.title)
  })

  test('likes get value 0 as default', async () => {
    const newBlog = {
      url: 'http://www.someurl.html',
      title: 'Testing default likes value',
      author: 'Someone'
    }
  
    await api
      .post('/api/blogs')
      .set(headers)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      
    const blogsAtEnd = await helper.blogsInDb()
    const added = blogsAtEnd.find(b => b.url === newBlog.url)
    expect(added.likes).toBe(0)
  })
  
  test('operation fails with proper error if url is missing', async () => {
    const newBlog = {
      title: 'Blazing Fast Delightful Testing',
      author: 'Rick Hanlon',
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('operation fails with proper error if token is missing', async () => {
    const newBlog = {
      title: 'Blazing Fast Delightful Testing',
      author: 'Rick Hanlon',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
  
  describe('and it has been saved to the database', () => {
    let result
    beforeEach(async () => {
      const newBlog = {
        title: 'Great developer experience',
        author: 'Hector Ramos',
        url: 'https://jestjs.io/blog/2017/01/30/a-great-developer-experience',
        likes: 7
      }

      result = await api
        .post('/api/blogs')
        .send(newBlog)
        .set(headers)
    })

    test('it can be removed', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = result.body
      
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set(headers)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

      const titles = blogsAtEnd.map(b => b.title)
      expect(titles).not.toContain(blogToDelete.title)
    })

  })
})

describe('updating of a blog', () => {
  test('succeeds with a valid updated blog', async () => {
    const [ aBlog ] = await helper.blogsInDb()
    const updatedBlog = {
      ...aBlog, likes: aBlog.likes + 1
    }

    await api
      .put(`/api/blogs/${aBlog.id}`)
      .send(updatedBlog)
      .expect(200)
    
    const blogsAtEnd = await helper.blogsInDb()
    const edited = blogsAtEnd.find(b => b.url === aBlog.url)
    expect(edited.likes).toBe(aBlog.likes + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})