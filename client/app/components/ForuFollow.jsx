import React from 'react';
import useFolloPost from '../zustand/posts/followPost';
import { GoArrowRight, GoArrowSwitch } from "react-icons/go";

function ForuFollow() {
    const {feed,setOutfeed,setFeed}=useFolloPost()
  return (
    <>
      <div className='fixed bottom-10 left-20 w-fit md:flex hidden  rounded-full hover:scale-105 bg-stone-900 z-10 text-white'>
            {!feed?

                <button className='py-4 px-8  flex justify-center gap-3 items-center   rounded-full w-auto h-auto' onClick={()=>setOutfeed()}>For you  <GoArrowSwitch/> </button>:
                <button className='py-4 px-8  flex justify-center gap-3 items-center    rounded-full w-auto h-auto' onClick={()=>setFeed()}>Following <GoArrowSwitch/> </button>
            }
        {/* <button className='w'>Following</button> */}
      </div>
    </>
  );
} 

export default ForuFollow;
