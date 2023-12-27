import React from 'react'

function Loading() {
  return (
    <div className='h-screen flex justify-center items-center '
    style={{
      zIndex:999
    }}>
     <span className="loading loading-ring loading-xl mb-30"></span>
    </div>
  )
}

export default Loading