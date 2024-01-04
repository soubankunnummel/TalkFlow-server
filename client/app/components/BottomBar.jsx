'use client'
import React, { useEffect } from 'react'
import { FaRegHeart } from 'react-icons/fa6'
import { HiHome, HiUser } from 'react-icons/hi2'
import { FiSearch } from "react-icons/fi";
import { IoCreateOutline } from "react-icons/io5";
import useProfile from '../zustand/posts/profilePost';
import { getPostuser, getProfielPost, getUsr } from '../service/users';
import usePosts from '../zustand/posts/posts';
import { useRouter } from 'next/navigation';

 
const BottomBar = () => { 

  const router = useRouter()
  const { setPost, serUser } = usePosts();
  const { setProfil, setOutProfile, setSearch, setLikes } = useProfile()
  let username

  const getUser = async () => {
    try {
      const response = await getUsr();
     
      if (response) {
        username = response.username;
      }
    } catch (error) {
      console.log("Error in nave bar");
    }
  };

  const handleProfile = async () => {
    setProfil()
    try {
      const response = await getProfielPost(username);
      const user = await getPostuser(username);
      
      if (response || user) {
        setPost(response);
        serUser(user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser()
    
  },[handleProfile])

  return (
    
    <div className="button-container ">
    <button className="btn  px-5 py-4 bg-transparent hover:bg-stone-800   border-none rounded-lg  "
    onClick={() => setOutProfile()}
    >
      <HiHome className="text-xl text-white text-opacity-50 hover:text-opacity-90" />
    </button>
    <button className="btn  px-5 py-4 bg-transparent hover:bg-stone-800 border-none rounded-lg  "
    onClick={() => setSearch()}
    >
      <FiSearch className="text-xl text-white text-opacity-50 hover:text-opacity-90" />
    </button>
    <button className="btn  px-5 py-4 bg-transparent hover:bg-stone-800 border-none rounded-lg  "
    onClick={() => router.push("/page/create") }
    >
      <IoCreateOutline className="text-xl text-white text-opacity-50 hover:text-opacity-90" />
    </button>
    <button className="btn  px-5 py-4 bg-transparent hover:bg-stone-800 border-none rounded-lg  "
    onClick={() => setLikes()}
    >
      <FaRegHeart className="text-xl text-white text-opacity-50 hover:text-opacity-90" />
    </button>
    <button className="btn  px-5 py-4 bg-transparent hover:bg-stone-800 border-none rounded-lg  "
    onClick={handleProfile}
    >
      <HiUser className="text-xl text-white text-opacity-50 hover:text-opacity-90" />
    </button>
   
  </div>
  )
}

export default BottomBar