import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [title, setNewTitle] = useState('')
  const [author, setNewAuthor] = useState('')
  const [url, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

/*   const addBlog = async (event) => {
    event.preventDefault()
    blogService.setToken(user.token)

    const blogObject = {
      title: title[0].title,
      author: author[0].author
    }
    console.log("title: " + title)
    console.log("author: " + author)
    console.log("url: " + url)
    //console.log("likes: " + likes)


    await blogService
      .create({blogObject})
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewAuthor('')
        setNewBlog('')
        setNewUrl('')
      })
  } */

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
      blogService.create (BlogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setNewAuthor('')
          setNewTitle('')
          setNewUrl('')     
        })

    } catch (exception) {
      setErrorMessage('can not create blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
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
    //console.log('logging in with', username, password)
  }

  const handleLogut = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    window.localStorage.clear()
    window.location.reload(true)
  }



  const handleTitleChange = async (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = async (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = async (event) => {
    setNewUrl(event.target.value)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <h2>Login</h2>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  /*   const logoutButton = () => (
      <div>
        <button onClick={handleLogut}>logout</button>
      </div>
    )
   */
  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title
          <input
          type="text"
          value={title}
          name="Title"
          //onChange={({ target }) => setNewTitle(target.value)}
          onChange={handleTitleChange}
        />
      </div>

      <div>
        author
          <input
          type="text"
          value={author}
          name="Author"
          //onChange={({ target }) => setNewAuthor(target.value)}
          onChange={handleAuthorChange}
        />
      </div>

      <div>
        url
          <input
          type="text"
          value={url}
          name="URL"
          //onChange={({ target }) => setNewUrl(target.value)}
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">save</button>
    </form>
  )


  return (
    <div>
      <h2>blogs</h2>
      {user === null ?
        loginForm() :

        <div>
          <p>{user.name} logged in</p>
          {blogForm()}
          <p><button onClick={handleLogut}>logout</button></p>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}


export default App