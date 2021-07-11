import React, { useState, useEffect,useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
//import Footer from './components/Footer'
import loginService from './services/login'
import signUpService from './services/signup'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  //const [showAll, setShowAll] = useState(false)
  const [showError, setShowError] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username,setUsername] = useState('')
  const [name,setName] = useState('')
  //const [usernamesup,setUsernamesup] = useState('')
  const [password,setPassword] = useState('')
  //const [passwordsup,setPasswordsup] = useState('')
  const [user,setUser] = useState(null)
  const [style, setStyle] = useState('')
  const [userBlogs, setUserBlogs] = useState([])

  useEffect(() => {
    if(user !== null){
      blogService.getAll().then(blogs => {
        setBlogs( blogs )
      })
    }
  }, [user])

  useEffect(() => {
    if(user !== null){
      loginService.getAll().then(users => {
        setUserBlogs( users.filter(useri => useri.username === user.username).map(u => u.blogs))
      })
    }
  }, [blogs,user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()


  const addBlog = (blogObject) => {

    if(!blogObject.title || !blogObject.url || !blogObject.author){
      setStyle(false)
      setErrorMessage('All fields should be filled')
      deletErrorMessage()
      return
    }
    //closes the blog form after a blog created
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(createdBlog => {
        setBlogs(blogs.concat(createdBlog))
        setShowError('')
        setStyle(true)
        setErrorMessage(`${blogObject.title} is added successfully`)
        deletErrorMessage()
      })

  }

  const deletErrorMessage = () => {
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }
  /* const userBlogss = loginService.getAll()
        .then(blogs => console.log('user blogs',blogs)) */
  //let blogUseri = ''
  const handleLikes = (id) => {

    const blog = blogs.find(n => n.id === id) //find the object we want to modify
    //const likes = blog.likes.map(n => n.username)
    // if(blog.user.username !== undefined ){blogUseri = blog.user.username}
    //console.log(blogUseri)
    //console.log('blog initially',blog.user.id || blog.user)

    //console.log('user blogs', userBlogs)
    let isLiked = blog.likes.includes(user.username)
    let changedblog = '' //isLiked ? { ...blog, likes: blog.likes.concat(user) } : { ...blog, likes: blog.likes.splice(blog.likes.indexOf(user),1)}
    if(isLiked){
      changedblog = { ...blog, likes: blog.likes.filter(n => n !== user.username), user:blog.user }
    }else{
      changedblog = { ...blog, likes: blog.likes.concat(user.username),user:blog.user }
    }
    //likes of the object changed
    //console.log(changedblog)
    blogService
      .update(id, changedblog)
      .then( modifiedblog => {
        setBlogs(blogs.map(
          blog => blog.id !== id ? blog : modifiedblog
        ))

      })
      .catch(error => {
        setErrorMessage(`The ${blog.title} is aleady coming from here deleted.`)
        console.log(error.message)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setBlogs(blogs.filter(n => n.id !== id))
      })
  }

  const handleDeleteBlog = (id) => {
    const blogToDelete = blogs.find(n => n.id === id)

    const confirm = window.confirm(`Remove blog ? ${blogToDelete.title} by ${blogToDelete.author}`)

    if(confirm){

      blogService
        .remove(id)
        .then( () => {
          setBlogs(blogs.filter(
            blog => blog.id !== id ? blog : ''
          ))
          setErrorMessage('Blog deleted successfully')
          setStyle(true)
          setTimeout(() => {
            setErrorMessage(null)

          }, 3000)
        })
        .catch(error => {
          console.log(error.body)
          if(error.message.includes(401)){
            setErrorMessage('Unauthorized to delete.')
          }else{
            setErrorMessage(`The blog is aleady deleted. or ${error.message}` )
          }
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
          setBlogs(blogs.filter(n => n.id !== id))
        })


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
      //to log out from local storage type in browser
      //window.localStorage.removeItem('loggedblogappUser')
      //window.localStorage.clear()

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setStyle(false)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleSignUp = async (event) => {
    event.preventDefault()
    try {
      const user = await signUpService.signup({
        username,name, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      //to log out from local storage type in browser
      //window.localStorage.removeItem('loggedblogappUser')
      //window.localStorage.clear()

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setName('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Password should be atleast 3 character long')
      setStyle(false)
      setUser(user)
      setUsername('')
      setName('')
      setPassword('')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const loginForm = () => {
    return (
      <Togglable buttonLabel='login' buttonExit='cancel'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }
  const signUpForm = () => {
    return (
      <Togglable buttonLabel='signup' buttonExit='cancel'>
        <SignUpForm
          username={username}
          name={name}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handleNameChange={({ target }) => setName(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleSignUp}
        />
      </Togglable>
    )
  }
  const blogForm = () => {


    /* <form onSubmit={addBlog}>
      <h3>Create new </h3>

      Title : <input value={title} onChange={ event => { setTitle(event.target.value)}} /><br/>
      Author : <input value={author} onChange={ event => { setAuthor(event.target.value)}} /><br/>
      Url : <input value={url} onChange={ event => { setUrl(event.target.value)}} /><br/><br/>
      <button type="submit">create</button>
    </form>   */
    return (
      <Togglable buttonLabel='new blog' buttonExit='cancel' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    )
  }

  if(user === null){
    return (
      <div>
        <h2>Log in to the application</h2>
        <Notification  message={errorMessage} notifyColor={style} deletErrorMessage={deletErrorMessage}  />
        {loginForm()}
        <p>Do not have an account? Sign up </p>
        {signUpForm()}
      </div>
    )
  }
  return (
    <div>
      <h2>Blogs lists : </h2>
      {/* { console.log('loggedin user blogs list')}
      {
        console.log(userBlogs[0][0])
      }
      {console.log('each log ids ' )}
      {blogs.map(blog => console.log(typeof blog.id))} */}



      <Notification  message={errorMessage} deletErrorMessage={deletErrorMessage} notifyColor={style} />
      <div style={{ color:'red', fontSize: 19 }}>{showError ? showError: ''}</div>
      <p>{user.username} logged-in <button onClick={() => {
        setUser(null)
        //setBlogs([])
        window.localStorage.removeItem('loggedBlogappUser')
      }
      }>Logout</button></p>

      {blogForm()}
      <br/>

      {/*blogs sorted decending order by likes first and listed   */}
      {
        blogs.sort((a,b) => {
          if(a.likes.length > b.likes.length) return -1
          if(a.likes.length < b.likes.length) return 1
          return 0
        }).map(blog =>

          <Blog
            key={blog.id}
            blog={blog}
            handleLikes={() => handleLikes(blog.id)}
            isItLiked={blog.likes.includes(user.username) ? 'unlike':'like'}
            handleDeleteBlog={ () => handleDeleteBlog(blog.id)}
            displayDeleteBtn={(userBlogs.length > 0 && userBlogs[0].includes(blog.id)) ? 'block' : 'none' }


          />


        )
      }


    </div>
  )
}

export default App