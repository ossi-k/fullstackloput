import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, addLike }) => {

  return (
    <li className='blog'>
      <a> title: {blog.title}</a>
      <br/>
      <Togglable buttonLabel="view">
      <a> author: {blog.author}</a>
      <br/>
      <a> url: {blog.url}</a>
      <br/>
      <a> likes: {blog.likes} </a>
      <br/>
      <button onClick={addLike}>like</button>
      </Togglable>
    </li>)
}

export default Blog
