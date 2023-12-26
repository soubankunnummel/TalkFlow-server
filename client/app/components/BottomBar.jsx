import React from 'react'
import { FaRegHeart } from 'react-icons/fa6'
import { HiHome, HiUser } from 'react-icons/hi2'
import { FiSearch } from "react-icons/fi";
import { IoCreateOutline } from "react-icons/io5";


const BottomBar = () => { 


  return (
    
    <div className="button-container ">
    <button className="btn  px-5 py-4 bg-transparent border-none rounded-lg  ">
      <HiHome className="text-xl text-white text-opacity-50 hover:text-opacity-90" />
    </button>
    <button className="btn  px-5 py-4 bg-transparent border-none rounded-lg  ">
      <FiSearch className="text-xl text-white text-opacity-50 hover:text-opacity-90" />
    </button>
    <button className="btn  px-5 py-4 bg-transparent border-none rounded-lg  ">
      <IoCreateOutline className="text-xl text-white text-opacity-50 hover:text-opacity-90" />
    </button>
    <button className="btn  px-5 py-4 bg-transparent border-none rounded-lg  ">
      <FaRegHeart className="text-xl text-white text-opacity-50 hover:text-opacity-90" />
    </button>
    <button className="btn  px-5 py-4 bg-transparent border-none rounded-lg  ">
      <HiUser className="text-xl text-white text-opacity-50 hover:text-opacity-90" />
    </button>
   
  </div>
  )
}

export default BottomBar