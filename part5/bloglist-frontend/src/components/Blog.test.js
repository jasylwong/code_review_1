import React from 'react'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  test('renders the title and author', () => {
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

    expect(title).toHaveTextContent('Testing blog renders')
    expect(author).toHaveTextContent('Jason Wong')
  })
})


