import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('updates parent state and calls onSubmit', () => {
    const createBlog = jest.fn()
    
    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'Title test'}
    })
    fireEvent.change(author, {
      target: { value: 'Author test'}
    })
    fireEvent.change(url, {
      target: { value: 'urltest.com'}
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Title test')
    expect(createBlog.mock.calls[0][0].author).toBe('Author test')
    expect(createBlog.mock.calls[0][0].url).toBe('urltest.com')
  })
})