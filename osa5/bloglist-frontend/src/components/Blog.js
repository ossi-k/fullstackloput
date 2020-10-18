import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, addLike, removeBlog }) => {

  return (
    <li className='blog'>
      <a> title: {blog.title}</a>
      <br/>
      <a> author: {blog.author}</a>
      <br/>
      <Togglable buttonLabel="view">
      <a> url: {blog.url}</a>
      <br/>
      <a> likes: {blog.likes} </a>
      <br/>
      <button id ='like-blog-button' onClick={addLike}>like</button>
      <button id = 'remove-blog-button' onClick={removeBlog}>remove</button>
      </Togglable>
    </li>)
}

export default Blog
