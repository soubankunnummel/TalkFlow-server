"use client";
import React from "react";
import { MdOutlineSort } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { HiHome, HiUser } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutUser } from "../service/auth";
import { CgMoreO } from "react-icons/cg";



function NavBar() {
  const router = useRouter();
  const handleSearchButtonClick = () => {
    router.push("/page/search");
  };

  // logout

  const handleLogout = async () => {
    try {
      const response = await logoutUser(); 
      if (response) {
        alert("Logged out");
        // setCookieToken(null);
        router.push("/");
      }
    } catch (error) {
      console.log("Erro in Logout ui", error);
    }
  };

  // creat post

  const  handleCreatPost = async () => {
     document.getElementById("my_modal_2").showModal()
  };

  return (
    <div
      className="w-full h-auto mt-0 p-5 bg-black flex  justify-between items-center sticky top-0 bg-opacity-90  "
      style={{
        zIndex: 1000,
      }}
    >
      <div className="text-xs  font-thin w-full md:w-auto flex justify-center">
        {" "}
        <div
          className="md:h-14 md:w-14 h-8 w-8 bg-black"
          style={{
            backgroundImage: `url("https://seeklogo.com/images/T/threads-logo-1ABBA246BE-seeklogo.com.png")`,
            backgroundSize: "contain",
          }}
        ></div>{" "}
      </div>
      <div className=" text-white font-thin h-auto md:flex hidden  ">
        <button className=" h-auto px-7 py-5 bg-transparent hover:bg-stone-800 border-none  rounded-lg flex flex-col justify-center items-center ">
          <HiHome className="text-3xl text-white text-opacity-50 hover:text-opacity-90" />
        </button>
        <button
          className=" btn h-auto px-7 py-5 bg-transparent hover:bg-stone-800 border-none  rounded-lg flex flex-col justify-center items-center"
          onClick={handleSearchButtonClick}
        >
          <FiSearch className="text-3xl text-white text-opacity-50  hover:text-opacity-90" />
        </button>

        <dialog id="my_modal_2" className="modal flex justify-center ">
          <div className="modal-box w-full h-[300px] bg-transparent flex justify-between flex-col">
            <div className="w-full h-5 bg-transparent flex justify-evenly text-white my-2 ">
              <div className="w-3/4 text-center text-md font-bold">New thread</div>
              <div className="w-auto items-end mt-[1.5px]">
                <CgMoreO/>
              </div>
            </div>
            <div className="w-full h-[400px] bg-stone-900  rounded-3xl">
            <div className="w-full h-8 bg-blue-500 flex justify-start  my-4 mx-3">

            <div className="h-20 w-8 bg-red-600 flex justify-center flex-col gap-1 "> 
            <div className="w-7 h-7 rounded-full bg-white"></div>
            <div className="h-5 w-[1px] bg-opacity-20 bg-white ms-3 "> </div>
            </div>
            <div className="w-full h-auto bg-yellow-600">user name</div>
            </div>

            </div>
            
          
          </div>
          <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute left-[820px] top-[210px]">✕</button>
    </form>
        </dialog>

        <button
          className=" h-auto  py-n px-7 bg-transparent hover:bg-stone-800 border-none rounded-lg  flex flex-col justify-center items-center"
          onClick={handleCreatPost}
        >
          <IoCreateOutline className="text-3xl text-white text-opacity-50 hover:text-opacity-90" />
        </button>
        <button className=" h-auto px-7 py-5 bg-transparent hover:bg-stone-800  rounded-lg  border-none flex flex-col justify-center items-center ">
          <FaRegHeart className="text-3xl text-white text-opacity-50 hover:text-opacity-90" />
        </button>
        <button className=" h-auto px-7  py-5 bg-transparent hover:bg-stone-800  rounded-lg flex border-none flex-col justify-center items-center ">
          <HiUser className="text-3xl text-white text-opacity-50 hover:text-opacity-90" />
        </button>
      </div>
      <div className="text-3xl text-white font-thin md:flex hidden ">
        {" "}
        <div className="dropdown dropdown-end ">
          <div tabIndex={0} role="button">
            {" "}
            <MdOutlineSort />{" "}
          </div>
          <ul
            tabIndex={0}
            className="p-2 shadow menu dropdown-content z-[1] bg-stone-900 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a> 
            </li>
            <li>
              <a onClick={handleLogout}>Log out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
