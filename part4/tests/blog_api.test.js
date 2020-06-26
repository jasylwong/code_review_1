const mongoose = require('mongoose')
const supertest = require("supertest")
const helper = require('./test_helper')
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const User = require("../models/user")
const bcrypt = require("bcrypt")
const { update } = require('../models/blog')
const { notify } = require('../app')
const jwt = require('jsonwebtoken')

let token

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

  await User.deleteMany()
  const passwordHash = await bcrypt.hash('secret', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()
  token = jwt.sign(user.toJSON(), process.env.SECRET)
})

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

test('unique identifier property of blogs is named id', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]
  expect(blog.id).toBeDefined();
})

test('a valid blog can be added', async () => {
  const newBlog = {
    id: "5a422aa71b54a676234d17f9",
    title: "Testing valid blog can be added with token",
    author: "Jason Wong",
    url: "http://www.testingvalidblogcanbeadded.html",
    likes: 5,
    __v: 0
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(blog => blog.title)
  expect(contents).toContain(newBlog.title)
})

test('likes defaults to 0 if not given on blog creation', async () => {
  const newBlog = {
    _id: '5a422aa71b54a676234d28f7',
    url: 'http://www.someurl.html',
    title: 'Testing default likes value'
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    
  const latestBlog = await Blog.findById(newBlog._id)
  expect(latestBlog.likes).toEqual(0)
})

test('missing title and url properties returns 400 bad request', async () => {
  const invalidBlog = {
    _id: "5a422aa71b54a676234d17f9",
    author: "Nobody",
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(invalidBlog)
    .expect(400)

  const invalidBlogSearch = await Blog.findById(invalidBlog._id)
  expect(invalidBlogSearch).toEqual(null)
})

describe('deletion of a blog', () => {
  test('deleting a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    
    const newBlog = {
      _id: "5a422aa71b54a676234d17f9",
      author: "Who cares",
      title: "Whatever",
      url: "whatever.com"
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)

    const blogToDelete = await Blog.findById(newBlog._id)
    
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })
})

describe('updating of a blog', () => {
  test('succeeds with a valid updated blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedLikes = blogToUpdate.likes + 1

    const updatedBlog = {
      ...blogToUpdate, likes: updatedLikes
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    expect(blogsAtEnd[0].likes).toEqual(updatedLikes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})