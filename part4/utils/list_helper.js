const blogRouter = require("../controllers/blogs")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likesArray = blogs.map(blog => blog.likes)
  return likesArray.reduce((a,b) => a + b,0)
}

module.exports = { dummy, totalLikes }

