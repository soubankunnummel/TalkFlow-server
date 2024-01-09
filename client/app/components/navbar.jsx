"use client";
import React, { useEffect, useId, useRef } from "react";
import { MdOutlineSort } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { HiHome, HiUser } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { logoutUser } from "../service/auth";
import { CgMoreO } from "react-icons/cg";
import useProfile from "../zustand/posts/profilePost";
import { GoHeart } from "react-icons/go";
import { getPostuser, getProfielPost, getUsr } from "../service/users";
import usePosts from "../zustand/posts/posts";
import { IoImagesOutline } from "react-icons/io5";
import usePostsStroe from "../zustand/posts/postStroe";
import { createPost } from "../service/post";
import { useForm } from "react-hook-form";
import CreatePostModal from "./PostModal";
import toast from "react-hot-toast";

var username;
let userId;
function NavBar() {
  const fileInputRef = useRef(null);
  const { setPost, serUser } = usePosts();
  let { postedBy, setPostedBy, text, setText, image, setImage, resetState } =
    usePostsStroe();
  const { setProfil, setOutProfile, setSearch, setLikes } = useProfile();
  // const { handleSubmit, register, setValue } = useForm();
  const router = useRouter();

  const handleCreatePost = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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

  const handleSearch = async () => {
    setSearch();
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

  const handleLikes = () => {
    setLikes();
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // creat post

  const handleCreatPost = async () => {
    // document.getElementById("my_modal_2").showModal();
    router.push("/page/create");
  };

  useEffect(() => {
    getUser();
  }, []);

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
          <HiHome className="text-3xl text-white text-opacity-50 hover:text-opacity-90" />
        </button>
        <button
          className=" btn h-auto px-7 py-5 bg-transparent hover:bg-stone-800 border-none  rounded-lg flex flex-col justify-center items-center"
          onClick={handleSearch}
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
          onClick={handleCreatPost}
        >
          <IoCreateOutline className="text-3xl text-white text-opacity-50 hover:text-opacity-90" />
        </button>
        <button
          className="btn h-auto px-7 py-5 bg-transparent hover:bg-stone-800  rounded-lg  border-none flex flex-col justify-center items-center "
          onClick={handleLikes}
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
              <a>Swich Appearnse</a>
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
