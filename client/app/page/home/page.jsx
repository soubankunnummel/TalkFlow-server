"use client"
import Post from "@/app/components/Post";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Profile from "../profile/page";
import useProfile from "@/app/zustand/posts/profilePost";
// import useSearch from "@/app/zustand/posts/searchUser";
import Search from "@/app/components/Search";
import Likes from "@/app/components/Likes";
  

function Home() {

  const { selected } = useProfile();
  const  {search} = useProfile()
  const router = useRouter();   
  

  return (
    <div className=" w-full h-auto flex justify-center flex-col items-center">
     

     {selected === "profile" && <Profile />}
      {selected === "search" && <Search />}
      {selected === "likes" && <Likes />}
      {!selected && <Post />}
      
   


      
     
      
    
    </div>
  );
}

export default Home;
