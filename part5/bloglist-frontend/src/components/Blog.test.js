import React from 'react'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  test('renders the title, author, likes and url', () => {
    const blog = {
      title: "Testing blog renders",
      author: "Jason Wong",
      url: "http://www.testingvalidblogcanbeadded.html",
      likes: 5,
    }

    const component = render(
      <Blog blog={blog} />
    )

    const title = component.container.querySelector('.title')
    const author = component.container.querySelector('.author')
    const likes = component.container.querySelector('.likes')

    expect(title).toHaveTextContent('Testing blog renders')
    expect(author).toHaveTextContent('Jason Wong')
    expect(component.container).toHaveTextContent('testingvalidblog')
    expect(likes.textContent).toBe("Likes: 5")
  })
})


