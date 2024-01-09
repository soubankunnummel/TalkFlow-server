import React from 'react'
import { TbMessageCircle } from "react-icons/tb";
import { gePostbyId  } from '../service/post';
import toast from 'react-hot-toast';
import usePosts from '../zustand/posts/posts';

 
function Coment({postId , index}) {

  const {setPostById } = usePosts(); 

  const hadleClick = async (id) => {
    // ()=>document.getElementById('my_modal_4').showModal()

    try {
      const post = await gePostbyId(id)
    
      if(post){
        setPostById(post)
        document.getElementById('my_modal_4').showModal();
      }
    } catch (error) {
      console.log(error)
    }
   

  }


  
  return (
    <div className='w-9 h-9 bg-transparent hover:bg-stone-900 rounded-full flex justify-center items-center'
    onClick={() => hadleClick(postId)}
    >

    <TbMessageCircle className='text-2xl transform scale-x-[-1]'/>

    </div>
  )
}

export default Coment