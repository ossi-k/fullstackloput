import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
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
  /*   const noteForm = () => {
      <form onSubmit={addBlog}>
        <input
          value={addBlog}
          onChange={handleBlogChange}
        />
        <button type="submit">save</button>
      </form>
    } */


  return (
    <div>
      <h2>blogs</h2>



      {user === null ?
        loginForm() :

        <div>
          <p>{user.name} logged in</p>
          <div>
            <button onClick={handleLogut}>logout</button>
          </div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}

        </div>
      }


    </div>
  )
}


export default App