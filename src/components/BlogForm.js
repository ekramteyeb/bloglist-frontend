import React,{ useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')



  const addBlog = (event) => {
    event.preventDefault() //prevents form submiting usual action like page load
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    createBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')

  }
  return (
    <div style={{ display:'inline-block' }}>

      <form onSubmit={addBlog}>
        <h3>Create new </h3>

      Title : <input id='title' value={title} onChange={ event => { setTitle(event.target.value)}} /><br/>
      Author : <input id='author' value={author} onChange={ event => { setAuthor(event.target.value)}} /><br/>
      Url : <input id='url' value={url} onChange={ event => { setUrl(event.target.value)}} /><br/><br/>
        <button  id='create-blog' type="submit">create</button>

      </form>
    </div>

  )
}
export default BlogForm


