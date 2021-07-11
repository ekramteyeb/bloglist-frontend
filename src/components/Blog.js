/* eslint-disable linebreak-style */
import React, { useState } from 'react'
//import Togglable from './Togglable'

const Blog = ({ blog,handleLikes, handleDeleteBlog ,isItLiked,displayDeleteBtn }) => {

  const [display, setDisplay] = useState(false)
  //const [liked, setLiked] = useState('false')

  const blogStyle = {
    padding:10,
    border:'solid green 1px',
    borderWidth: 4,
    marginBottom: 5,
    marginTop:5,
    borderRadius:'0.5em'
  }

  return (
    <div className="blog" style={blogStyle}>

      {blog.title} by {blog.author} <button className='display' onClick={() => setDisplay(!display)}>{display ? 'hide' : 'view'}</button>
      <br/>
      <div className='togglableDiv' style={{ display: display ? 'block': 'none' }}>
        <a href={blog.url}>{blog.url}</a> <br/>
        <span className='likesCount' >{blog.likes.length === null ? 0 : blog.likes.length} </span><button className='likes' onClick={handleLikes}
          style={{ fontSize:10, borderRadius:'1em' }}>{isItLiked}</button>
        <br/>

        <button id='deleteButton' onClick={handleDeleteBlog}
          style={{ fontSize:10,backgroundColor:'#6595ED', margin:5,display:`${displayDeleteBtn}` }}>
       remove
        </button>
      </div>



    </div>
  )
}

export default Blog
