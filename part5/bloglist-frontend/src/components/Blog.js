import React from 'react'

const Blog = ({ blog, addLike, deleteBlog }) => {
  const blogStyle = {
    border: 'solid black 2px',
    padding: '3px',
    margin: '3px'
  }

  return (
    <div style={blogStyle}>
      <div className="title"><strong>Title: </strong>{blog.title}</div>
      <div className="author"><strong>Author: </strong> {blog.author}</div>
      <div><strong>URL: </strong><a href="https://www.bbc.co.uk/news">{blog.url}</a></div>
      <div className="likes"><strong>Likes: </strong>{blog.likes}</div><button onClick={addLike}>like</button>
      <button onClick={deleteBlog}>delete</button>
    </div>
  )
}

export default Blog
