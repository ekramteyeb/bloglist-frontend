import React from 'react'

const notifySuccess = {

  color: 'green',
  backgroundColor: 'lightgray',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10

}

// eslint-disable-next-line no-unused-vars
const Notification = ({ message, deletErrorMessage,notifyColor }) => {

  if(message === null){
    return null
  }
  return(
    <div className='error' style={notifyColor ? notifySuccess : { ...notifySuccess,color:'red' }}>
      {message}
    </div>
  )
}


export default Notification