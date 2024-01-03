import { GoHeart } from "react-icons/go";

import React, { useState } from 'react'
import { likePost } from "../service/post";
import usePosts from "../zustand/posts/posts";
import { IoHeart } from "react-icons/io5";

function Like({postId, index}) { 

  const [LikeStates, setLikeStates] = useState([]);

  const {likes, setLikes} = usePosts()
  const handleClick = async () => {
    try {
      const response = await likePost(postId)
      if(response ){ 
        setLikeStates((prevState) => {
          const newState = [...prevState]
          newState[index] = !prevState[index]
          return newState
        })
        setLikes()
       
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-9 h-9 bg-transparent hover:bg-stone-900 rounded-full flex justify-center items-center"
    onClick={handleClick}
    >
      {LikeStates[index] ? <IoHeart  className="text-2xl text-red-700" /> : <GoHeart className="text-2xl " /> }
        
    </div>
  )
}

export default Like