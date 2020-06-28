import React from 'react'

const Blog = ({ blog, addLike, deleteBlog }) => {
  const blogStyle = {
    border: 'solid black 2px',
    padding: '3px',
    margin: '3px'
  }

  return (
    <div style={blogStyle}>
      <div><strong>Title: </strong>{blog.title}</div>
      <div><strong>Author: </strong> {blog.author}</div>
      <div><strong>URL: </strong><a href="https://www.bbc.co.uk/news">url</a></div>
      <div><strong>User: </strong>{blog.user.name}</div>
      <div><strong>Likes: </strong>{blog.likes}</div><button onClick={addLike}>like</button>
      <button onClick={deleteBlog}>delete</button>
    </div>
  )
}

export default Blog
