import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('renders content', () => {

  const blog = {
    title: 'test title',
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('test title')

  expect(element).toBeDefined()


})

test('clicking the button twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'test user',
    url: 'testinguRL'
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} toggleLike={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('Like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

describe('<Toggle view />', () => {
  let container

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'test user',
    url: 'testinguRL'
  }
  beforeEach(() => {
    container = render(
      <Blog blog={blog} buttonLabel="view">
        <div className="testDiv" >
        blog
        </div>
      </Blog>
    ).container
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.blogContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blogContent')
    expect(div).not.toHaveStyle('display: none')

  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()

    const button = screen.getByText('view')
    await user.click(button)

    const closeButton = screen.getByText('hide')
    await user.click(closeButton)

    const div = container.querySelector('.blogContent')
    expect(div).toHaveStyle('display: none')
  })
})

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('write title here')
  const inputAuthor = screen.getByPlaceholderText('write author here')
  const inputUrl = screen.getByPlaceholderText('write url here')
  const sendButton = screen.getByText('create')

  await user.type(inputTitle, 'testTitle')
  await user.type(inputAuthor, 'testAuthor')
  await user.type(inputUrl, 'testURL')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testTitle')
  expect(createBlog.mock.calls[0][0].author).toBe('testAuthor')
  expect(createBlog.mock.calls[0][0].url).toBe('testURL')
})



