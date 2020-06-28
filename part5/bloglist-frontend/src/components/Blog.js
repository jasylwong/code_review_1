import React from 'react'

const Blog = ({ blog, addLike }) => {
  const blogStyle = {
    border: 'solid black 2px',
    padding: '3px',
    margin: '3px'
  }

  return (
    <div style={blogStyle}>
      <div>"{blog.title}" by {blog.author}</div>
      <div>likes: {blog.likes}</div><button onClick={addLike}>like</button>
    </div>
  )
}

export default Blog
