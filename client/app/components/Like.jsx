import { GoHeart } from "react-icons/go";
import React, { useState, useEffect } from 'react';
import { getNotification, getPost, likePost } from "../service/post";
import usePosts from "../zustand/posts/posts";
import { IoHeart } from "react-icons/io5";
import { getUsr } from "../service/users";
import toast from "react-hot-toast";
// import { useSocket } from "../context/SocketContext";

function Like({ postId, index , username}) {
  const [likeStates, setLikeStates] = useState([]);
  const { likes, setLikes , setPost} = usePosts();
  // const { socket } = useSocket()

  useEffect(() => {
    const likedStatesFromStorage = JSON.parse(localStorage.getItem('likedStates')) || [];
    setLikeStates(likedStatesFromStorage);
  }, []);

  const handleClick = async () => {
    try {
      const response = await likePost(postId);
      const post =  await getPost();

     
      if (response && post) {
        const reply = await getNotification()
        console.log("post in like ", post)
        console.log("rep")
        if(reply){
          toast.success("POst liked")
        }

        
        setPost(post)
        setLikeStates((prevState) => {
          const newState = [...prevState];
          newState[index] = !prevState[index];
          return newState;
        });

        localStorage.setItem('likedStates', JSON.stringify(likeStates));

        setLikes();
      //   if (socket) {
      //     socket.emit('likePost', {
      //         postId,
      //         senderUserId: getUsr()._id, 
      //         receiverUserId: post.postedBy,
      //     });
      // }

      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="w-9 h-9 bg-transparent hover:bg-stone-900 rounded-full flex justify-center items-center"
      onClick={handleClick}
    >
      {likeStates[index] ?   <IoHeart className="text-2xl text-red-700" /> : <GoHeart className="text-2xl" />  }
    </div>
  );
}

export default Like;
