import React from 'react'
import usePosts from '../zustand/posts/posts'

function Reposts() {
    const {setRepost} = usePosts()

    const handleClick = async () => {
      try {
        setRepost()
      } catch (error) {
        
      }
    }
  return (
    <>
    <div  className='w-full h-10  active:border-b-[1px]'>

        <button className='w-full h-full' onClick={handleClick}>Reposts</button>
    </div>
    </>
  )
}

export default Reposts