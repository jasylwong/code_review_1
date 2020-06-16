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

module.exports = { dummy, totalLikes, favoriteBlog }

