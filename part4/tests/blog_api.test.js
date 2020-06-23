const mongoose = require('mongoose')
const supertest = require("supertest")
const helper = require('./test_helper')
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
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
  const newBlog =   {
    id: "5a422aa71b54a676234d17f9",
    title: "Testing valid blog can be added",
    author: "Jason Wong",
    url: "http://www.testingvalidblogcanbeadded.html",
    likes: 5,
    __v: 0
  }

  await api
    .post('/api/blogs')
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

  await api.post('/api/blogs').send(newBlog)

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
    .send(invalidBlog)
    .expect(400)

  const invalidBlogSearch = await Blog.findById("5a422aa71b54a676234d17f9")
  expect(invalidBlogSearch).toEqual(null)
})

test('deleting a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
})

afterAll(() => {
  mongoose.connection.close()
})