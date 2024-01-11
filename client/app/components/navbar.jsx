"use client";
import React, { useEffect, useRef } from "react";
import { MdOutlineSort } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { HiHome, HiUser } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { logoutUser } from "../service/auth";
import useProfile from "../zustand/posts/profilePost";
import { GoHeart } from "react-icons/go";
import { getPostuser, getProfielPost, getUsr } from "../service/users";
import usePosts from "../zustand/posts/posts";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";

var username;
let userId;
function NavBar() {
  const fileInputRef = useRef(null); 
  const { setPost, serUser } = usePosts();
  const { theme, setTheme } = useTheme();
  const { setProfil, setOutProfile, setSearch, setLikes } = useProfile();
  const router = useRouter();

  

  const getUser = async () => {
    try {
      const response = await getUsr();

      console.log(response.username);
      if (response) {
        username = response.username;
        userId = response._id;
      }
    } catch (error) {
      console.log("Error in nave bar", error);
    }
  };


  const handleProfile = async () => {
    try {
      const response = await getProfielPost(username);
      const user = await getPostuser(username);

      if (response && user) {
        setPost(response);
        serUser(user);
      }
    } catch (error) {
      console.log(error);
    }
    setProfil();
  };


  // logout

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response) {
        toast.success("Logged out successfully");

        router.push("/page/login");
      }
    } catch (error) {
      console.log("Erro in Logout ui", error);
    }
  };

  // theam chnaging

  // const currentTheam = theam === 'system' ?  systemTeam: theam
  const handleToggleTheme = () => {
    console.log('Current theme:', theme)
    setTheme(theme === "dark" ? "light" : "dark");
  }

  useEffect(() => {
    getUser()
  }, []);

  return (
    <div
    className={`w-full h-auto mt-0 p-5 flex  justify-between items-center sticky top-0 bg-opacity-90 ${
      theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white '
    }`}
    style={{
      zIndex: 1000,
    }}
  >
      <div className="text-xs  font-thin w-full md:w-auto flex justify-center">
        {" "}
        <div
          className={`md:h-14 md:w-14 h-8 w-8${
            theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white '
          }`}
          style={{
            backgroundImage: `url("https://seeklogo.com/images/T/threads-logo-1ABBA246BE-seeklogo.com.png")`,
            backgroundSize: "contain",
          }}
        ></div>
    
        <div className="dropdown dropdown-end text-3xl absolute right-0 md:hidden">
          <div tabIndex={0} role="button">
            <MdOutlineSort />
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
              <a onClick={() => router.push("page/login")}>Log out</a>
            </li>
          </ul>
        </div>{" "}
      </div>
      <div className=" text-white font-thin h-auto md:flex hidden  ">
        <button
          className="btn h-auto px-7 py-5 bg-transparent hover:bg-stone-800 border-none  rounded-lg flex flex-col justify-center items-center "
          onClick={() => setOutProfile()}
        >
          <HiHome className={`text-3xl text-white text-opacity-50 hover:text-opacity-90`} />
        </button>
        <button
          className=" btn h-auto px-7 py-5 bg-transparent hover:bg-stone-800 border-none  rounded-lg flex flex-col justify-center items-center"
          onClick={() =>  setSearch()}
        >
          <FiSearch className="text-3xl text-white text-opacity-50  hover:text-opacity-90" />
        </button>

        {/* <CreatePostModal
          username={username}
          setText={setText} 
          handleFileChange={handleFileChange}
          handlePostSubmit={handlePostSubmit}
        /> */}

        <button
          className="btn h-auto  py-n px-7 bg-transparent hover:bg-stone-800 border-none rounded-lg  flex flex-col justify-center items-center"
          onClick={() => router.push("/page/create")}
        >
          <IoCreateOutline className="text-3xl text-white text-opacity-50 hover:text-opacity-90" />
        </button>
        <button
          className="btn h-auto px-7 py-5 bg-transparent hover:bg-stone-800  rounded-lg  border-none flex flex-col justify-center items-center "
          onClick={(() => setLikes())}
        >
          <GoHeart className="text-3xl text-white text-opacity-50 hover:text-opacity-90" />
        </button>
        <button
          className="btn h-auto px-7  py-5 bg-transparent hover:bg-stone-800  rounded-lg flex border-none flex-col justify-center items-center "
          onClick={handleProfile}
        >
          <HiUser className="text-3xl text-white text-opacity-50 hover:text-opacity-90" />
        </button>
      </div>
      <div className="text-3xl text-white text-opacity-50 font-thin md:flex hidden ">
        {" "}
        <div className="dropdown dropdown-end md:flex justify-end ">
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
              <a onClick={handleToggleTheme}>Swich Appearnse</a>
            </li>

            { localStorage.getItem("jwt") ? (
            <li>
              <a onClick={handleLogout}>Log out</a>
            </li>

            ): (
            <li>
              <a onClick={() => router.push("/page/login")}>LogIn</a>
            </li>

            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
