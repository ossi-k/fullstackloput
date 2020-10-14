import React from 'react'

const NewBlogMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='newblogmessage'>
      {message}
    </div>
  )
}

export default NewBlogMessage