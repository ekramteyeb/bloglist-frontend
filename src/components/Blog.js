/* eslint-disable linebreak-style */
import React, { useState } from 'react'
//import Togglable from './Togglable'

//import Box from '@mui/material/Box'
import { Paper } from '@mui/material'
const Blog = ({ blog,handleLikes, handleDeleteBlog ,isItLiked,displayDeleteBtn }) => {

  const [display, setDisplay] = useState(false)
  //const [liked, setLiked] = useState('false')

  const blogStyle = {
    padding:12,
    borderWidth: 4,
    marginBottom: 10,
    marginTop:5
  }

  return (

    <div className="blog" >
      <Paper elevation={3} style={blogStyle} >
        <span style={{ color:'lightslategray',fontWeight:'bolder' }}>{blog.title} </span> <button className='display' onClick={() => setDisplay(!display)}>{display ? 'hide' : 'view'}</button>
        <p style={{ color:'lightslategray', fontSize:'12px' }}>by {blog.author}</p>
        <div className='togglableDiv' style={{ display: display ? 'block': 'none' }}>
          <a href={blog.url}>{blog.url}</a> <br/>
          <span className='likesCount' style={{ fontSize: 12 }} >{blog.likes.length === null ? 0 : blog.likes.length} </span><button className='likes' onClick={handleLikes}
            style={{ fontSize:12, borderRadius:'1em' }}>{isItLiked}</button>
          <br/>

          <button id='deleteButton' onClick={handleDeleteBlog}
            style={{ fontSize:12,backgroundColor:'#6595ED', margin:5,display:`${displayDeleteBtn}` }}>
       remove
          </button>
        </div>

      </Paper>
    </div>
  )
}

export default Blog


/*

  import * as React from 'react';


export default function SimplePaper() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
      <Paper elevation={0} />
      <Paper />
      <Paper elevation={3} />
    </Box>
  );
}
 */