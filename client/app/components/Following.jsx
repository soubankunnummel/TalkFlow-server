import { useEffect, useState } from "react";
import useFolloPost from "../zustand/posts/followPost";

function FolloWing({ isActive, setActiveComponent }) {

  const {setOutfeed}=useFolloPost() 
  // useEffect(() => {
  //   handlFollwing();
    
  // }, []);

  const handlFollwing = async () => {
    if (!isActive) {
      setActiveComponent("Following");
    }
    try {
    } catch (error) {}
  };
  return (
    <>
      <div
        className={`w-1/2  flex justify-center items-center border-stone-800   text-xs text-white text-opacity-40 hover:text-white ${
          isActive ? "border-b-[1px]" : "border-none"
        } `}
        onClick={handlFollwing}
      >
        <button className="w-full h-full" onClick={()=>setOutfeed()}>Following</button>
      </div>
    </>
  );
}

export default FolloWing;
