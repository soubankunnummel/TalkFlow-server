import React from "react";
import { RiSearchLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

function Activity() {
  return (
    <div className="w-full md:w-[780px]  h-screen md:p-2 p-3 flex flex-col relative justify-between items-center">
      <div className="h-auto w-full  bg-black border-white flex flex-col justify-center items-center border-opacity-30 p-2">
        <div className="h-auto w-full  flex justify-center items-center gap-5 overflow-x-auto sm:overflow-x-hidden">
          <button className="w-[100px] sm:w-[120px] h-9 mb-2 md:mb-0 border border-white border-opacity-20 rounded-lg flex justify-center items-center active:bg-white active:text-black">
            All
          </button>
          <button className="w-[100px] sm:w-[120px] h-9 mb-2 md:mb-0 border border-white border-opacity-20 rounded-lg flex justify-center items-center active:bg-white active:text-black">
            Followers
          </button>
          <button className="w-[100px] sm:w-[120px] h-9 mb-2 md:mb-0 border border-white border-opacity-20 rounded-lg flex justify-center items-center active:bg-white active:text-black">
            Replies
          </button>
          <button className="w-[100px] sm:w-[120px] h-9 mb-2 md:mb-0 border border-white border-opacity-20 rounded-lg flex justify-center items-center active:bg-white active:text-black">
            Mention
          </button>
          <button className="w-[100px] sm:w-[120px] h-9 mb-2 md:mb-0 border border-white border-opacity-20 rounded-lg flex justify-center items-center active:bg-white active:text-black">
            Quats
          </button>
          <button className="w-[100px] sm:w-[120px] h-9 mb-2 md:mb-0 border border-white border-opacity-20 rounded-lg flex justify-center items-center active:bg-white active:text-black">
            Reposts
          </button>
        </div>

        <div className="w-full h-auto flex flex-col md:flex-row justify-between items-center border-b-[1px] border-white border-opacity-20 text-white mt-3 p-3">
          <div className="w-full md:w-1/2 h-auto flex justify-start gap-2 items-center mb-3 md:mb-0">
            <div className="w-12 h-12 bg-white rounded-full overflow-hidden flex-shrink-0">
              <FaUser className="w-full h-full object-cover text-black" />
            </div>
            <div className="w-full md:w-auto h-auto flex flex-col ms-2">
              <span className="hover:underline mb-3 md:mb-0">writer</span>
              <span>1927k followers</span>
            </div>
          </div>

          <div className="w-full md:w-28 h-9 border border-white border-opacity-20 rounded-lg flex justify-center items-center">
            <button>Follow Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activity;
