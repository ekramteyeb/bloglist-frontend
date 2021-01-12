/* eslint-disable linebreak-style */
import React, { useState } from 'react'
//import Togglable from './Togglable'

const Blog = ({ blog,handleLikes, handleDeleteBlog ,isItLiked,displayDeleteBtn }) => {

  const [display, setDisplay] = useState(false)
  //const [liked, setLiked] = useState('false')

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    paddingBottom:5,
    border: 'solid green 1px',
    borderWidth: 1,
    marginBottom: 5,
    marginTop:5,
    borderRadius:'0.5em'
  }

  return (
    <div className="blog" style={blogStyle}>

      {blog.title} by {blog.author} <button className='display' onClick={() => setDisplay(!display)}>{display ? 'hide' : 'view'}</button>
      <br/>
      <div className='togglableDiv' style={{ display: display ? 'block': 'none' }}>
        {blog.url} <br/>
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
