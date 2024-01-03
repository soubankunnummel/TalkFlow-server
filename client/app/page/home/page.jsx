"use client"
import Post from "@/app/components/Post";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Profile from "../profile/page";
import useProfile from "@/app/zustand/posts/profilePost";
import Search from "@/app/components/Search";
import Activity from "@/app/components/Activity";
import UserProfile from "../user/page";
  

function Home() {

  const { selected } = useProfile();
  const  {search} = useProfile()
  const router = useRouter();   
  

  return (
    <div className=" w-full h-auto flex justify-center flex-col items-center ">
     

     {selected === "profile" && <Profile />}
     {selected === "userprofile" && <UserProfile/>}
      {selected === "search" && <Search />}
      {selected === "likes" && <Activity />}
      
      {!selected && <Post />}
      
   


      
     
      
    
    </div>
  );
}

export default Home;
