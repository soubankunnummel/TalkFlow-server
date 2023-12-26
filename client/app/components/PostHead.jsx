"use client"
import React, { useState } from "react";
import ForYou from "./Foryou";
import FolloWing from "./Following";

const PostHead = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [foryou, setForyou] = useState(true);

  const [data ,setData] = useState()
  return (
    <>

      <div className="w-auto  md:w-[580px] h-auto md:flex hidden justify-between items-center ">
        <div className="w-auto md:flex hidden px-2 py-4 justify-center items-center">

        <div
          className="h-10 w-10 rounded-full bg-white box-border "
          style={{
            backgroundImage:
            "url('https://img.freepik.com/free-photo/people-holding-wechat-icon_53876-63371.jpg?size=626&ext=jpg&ga=GA1.1.1677573732.1702106196&semt=ais')",
            backgroundSize: "contain",
          }}
          >
          {" "}
        </div>

        <button className="w-3/2 mx-4 text-white text-opacity-40 text-md   h-full flex justify-center items-center ">
          Start thread ...  
        </button>
          </div>
        <button className=" px-5 py-2 md:flex hidden  rounded-full bg-white text-black font-medium   bg-opacity-40">Post </button>
        
        
      </div>
      <div className="w-full h-10 flex md:hidden bg-black">
        {
foryou&&


          <ForYou
          isActive={activeComponent === "ForYou"}
          setActiveComponent={setActiveComponent}
          />
        }
        <FolloWing
          isActive={activeComponent === "Following"}
          setActiveComponent={setActiveComponent}
        />
      </div>
    </>
  );
};

export default PostHead;
