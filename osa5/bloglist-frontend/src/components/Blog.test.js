import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders title and author but not url and likes', () => {
    const blog = {
        title: 'Testing for the title',
        author: 'Tester',
        url: 'www.test.t',
        likes: '5'
    }

    const component = render(
        <Blog blog={blog}/>
    )

    expect(component.getByText(/title:/)).toBeVisible()
    expect(component.getByText(/author:/)).toBeVisible()
    expect(component.getByText(/url:/)).not.toBeVisible()
    expect(component.getByText(/likes:/)).not.toBeVisible()


/*     const li = component.container.querySelector('li')  
    console.log(prettyDOM(li)) */
}) 

test('url and author are visible after clicking view', async () => {
    const blog = {
        title: 'Testing for the title',
        author: 'Tester',
        url: 'www.test.t',
        likes: '5'
    }
    
    const component = render(
      <Blog blog={blog}/>
    )
  
    const button = component.getByText('view')
    fireEvent.click(button)
  
    expect(component.getByText(/title:/)).toBeVisible()
    expect(component.getByText(/author:/)).toBeVisible()
    expect(component.getByText(/url:/)).toBeVisible()
    expect(component.getByText(/likes:/)).toBeVisible()
  })

  test('addLike function is called two times when like-button is clicked twice', async () => {
    const blog = {
        title: 'Testing for the title',
        author: 'Tester',
        url: 'www.test.t',
        likes: '5'
    }

    const mockHandler = jest.fn()
    
    const component = render(
      <Blog blog={blog} addLike = {mockHandler}/>
    )
  
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(2)
  })