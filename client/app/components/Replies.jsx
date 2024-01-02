import React from 'react'
import usePosts from '../zustand/posts/posts'
import { getRepliedPosts } from '../service/post'

function Replies() {
   const {setRepliPost, setRepliposts, setReplies} = usePosts()

  const handleClick = async () => {
    setRepliPost() 
    try {  
      const response = await getRepliedPosts()
     
      if(response){
        setRepliposts(response)
      }
    } catch (error) {
       console.log(error)
    }
  }
  return (
    < >
    <div className='w-full h-10  active:border-b-[1px]'>

        <button className='w-full h-full' onClick={handleClick}>Replies</button>
    </div>
    </>
  )
}

export default Replies