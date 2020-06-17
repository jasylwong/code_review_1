const blogRouter = require("../controllers/blogs")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likesArray = blogs.map(blog => blog.likes)
  return likesArray.reduce((a,b) => a + b,0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  } else {
    const maxLikesBlog = blogs.reduce((a, b) => a.likes > b.likes ? a : b)
    return maxLikesBlog
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  } else {
    let authorsAndBlogCount = {}
    blogs.forEach(blog => {
      if(!authorsAndBlogCount[blog.author]) {
        authorsAndBlogCount[blog.author] = 1
      } else {
        authorsAndBlogCount[blog.author]++
      }
    })
    const output = Object.keys(authorsAndBlogCount).reduce((a, b) => authorsAndBlogCount[a] > authorsAndBlogCount[b] ? a : b)
    return {author: output, blogs: authorsAndBlogCount[output] }
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  } else {
    let authorsAndLikes = {}
    blogs.forEach(blog => {
      if(!authorsAndLikes[blog.author]) {
        authorsAndLikes[blog.author] = blog.likes
      } else {
        authorsAndLikes[blog.author] += blog.likes
      }
    })
    const output = Object.keys(authorsAndLikes).reduce((a, b) => authorsAndLikes[a] > authorsAndLikes[b] ? a : b)
    return {author: output, likes: authorsAndLikes[output] }
  }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } 

