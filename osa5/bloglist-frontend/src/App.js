import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogMessage from './components/NewBlogMessage'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [title, setNewTitle] = useState('')
  const [author, setNewAuthor] = useState('')
  const [url, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [newBlogMessage, setnewBlogMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogVisible, setnewBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const addBlog = async (event) => {
    event.preventDefault()

    const BlogObject = {
      title: title,
      author: author,
      url: url
    }

    console.log("title: " + title)
    console.log("author: " + author)
    console.log("url: " + url)

    try {
      blogService.create(BlogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setNewAuthor('')
          setNewTitle('')
          setNewUrl('')

          setnewBlogMessage('new blog ' + title + ' by ' + author + ' was added')
          setTimeout(() => {
            setnewBlogMessage(null)
          }, 5000)
        })

    } catch (exception) {
      setErrorMessage('new blog was not created')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogut = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    window.localStorage.clear()
    window.location.reload(true)
  }


  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  const blogForm = () => (
    <Togglable buttonLabel="new blog">
      <BlogForm
        onSubmit={addBlog}
        title={title}
        author={author}
        url={url}
        handleTitleChange={({ target }) => setNewTitle(target.value)}
        handleAuthorChange={({ target }) => setNewAuthor(target.value)}
        handleUrlChange={({ target }) => setNewUrl(target.value)}
      />
    </Togglable>
  )

  const addLikeOf = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    console.log("blogi " + blog)
    console.log("blogin likes: " + blog.likes)
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    console.log("blogin likes napin painalluksen jälkeen: " + changedBlog.likes)

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />


      {user === null ?
        loginForm() :

        <div>
          <p>{user.name} logged in</p>
          <NewBlogMessage message={newBlogMessage} />
          {blogForm()}

          <p><button onClick={handleLogut}>logout</button></p>
          <ul>
            {blogs.map(blog =>
              //<Togglable buttonLabel="view">
                <Blog
                  key={blog.id}
                  blog={blog}
                  addLike={() => addLikeOf(blog.id)}
                />
              //</Togglable>
            )}
          </ul>

        </div>
      }
    </div>
  )
}


export default App