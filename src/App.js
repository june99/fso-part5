import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/loginForm'
import BlogForm from './components/blogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  //what's the purpose of an empty array in the use effect hook
  //what does json.parse() do?
  //when was async-await introduced? Was it ES7?
  //form onSubmit, is this an event handler?
  //is the key actually a prop? Basically, how do I refer to this? it's a prop
  //practice building basic forms in react and submitting forms too

  //Store the username in a variable for readability
  //Check if the user has been saved to localstorage
  //If the user does exist,
    //parse their username and assign this to the user state variable
    //set the user's token


  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedBlogUser")
      if(loggedInUser){
        const user = JSON.parse(loggedInUser)
        setUser(user)
      }
    },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception){
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    if(user){
      window.localStorage.removeItem("loggedBlogUser")
      setUser(null)
    }
  }


  const handleBlogField = (event) => {
    event.preventDefault()
    const {name, value} = event.target
    console.log(newBlog.title)
    setNewBlog(prevBlog => ({
      ...prevBlog,
      [name] : value
    }))
  }
  const addBlog = async (event) => {
    event.preventDefault()
    // console.log("POST REQUEST: ",newBlog)
    try {
      const blog = await blogService.create(newBlog)
      console.log("POST REQUEST: ",newBlog)
      console.log('lets geddit')
      setBlogs(blogs.concat(blog))
    } catch (exception){
          setErrorMessage('Uh oh, try again :[')
            setTimeout(() => {
              setErrorMessage(null)
          }, 5000)
    }
  }

  if(user === null){
    return(
      <>
        {errorMessage}
        <h2>Log into application</h2>
        <LoginForm handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} username={username} password={password}/>
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {user && 
        <div>
          <h3>{user.username} logged in</h3>
          <button onClick={handleLogout}>Logout</button>
        </div>
      }
      <BlogForm handleSubmission={addBlog} newBlog={newBlog} handleBlogField={setNewBlog}/>
      {/* <BlogForm addBlog={addBlog} title={newBlog.title} setTitle={setTitle} setAuthor={setAuthor} author={newBlog.author} url={newBlog.url} setUrl={setUrl}/> */}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App