const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  if (request.body.title && request.body.url) {
    
    const users = await User.find({})
    const user = users[0]

    const blog = new Blog({
      ...request.body,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    user.save()

    response.status(201).json(savedBlog.toJSON())
  } else {
    response.status(400).end()
  }
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end() 
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
  response.status(200).send(updatedBlog)
})

module.exports = blogRouter
