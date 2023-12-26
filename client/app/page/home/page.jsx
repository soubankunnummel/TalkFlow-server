"use client"
import Post from "@/app/components/Post";
import PostHead from "@/app/components/PostHead";
import { useRouter } from "next/navigation";
// import Navbar from "@/app/components/navbar";
import React, { useState } from "react";
import Profile from "../profile/page";
 

function Home() {
  const router = useRouter();  
  const [profile,setProfiel] = useState(false)
  

  return (
    <div className=" w-full h-auto flex justify-center flex-col items-center">
     

      {/* <Post/> */}
      {profile ? <Profile/> : <Post/>}
      
     
      
    
    </div>
  );
}

export default Home;
