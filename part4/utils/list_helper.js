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

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  } else {
    const authors = authorsArr(blogs)
    const mostBlogsAuthor = mostInArr(authorsArr(blogs))
    const blogCount = blogCountByName(authors, mostBlogsAuthor)
    return { author: mostBlogsAuthor, blogs: blogCount }
  }
}

const authorsArr = (blogArr) => {
  return blogArr.map(blog => blog.author)
}

const mostInArr = (array) => {
  const most = array.reduce((a,b,i, arr) => (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b), null)
  return most
}

const blogCountByName = (names, name) => {
  return names.filter(n => n == name).length
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs } 

