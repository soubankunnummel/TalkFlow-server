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
import { useForm } from 'react-hook-form';


var username;
let userId
function NavBar() {
  
  const fileInputRef = useRef(null);
  const { setPost, serUser } = usePosts();
  let {postedBy, setPostedBy, text, setText, img, setImg, resetState} = usePostsStroe()
  const { setProfile, setOutProfile, setSearch, setLikes } = useProfile();
  const { handleSubmit, register, setValue } = useForm();
  
  
  const handleCreatePost = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const getUser = async () => {
    try {
      const response = await getUsr();
      
      console.log(response._id)
      if (response) {
        username = response.username;
        userId = response._id
        
      }
    } catch (error) {
      console.log("Error in nave bar");
    }
  };
  const router = useRouter();

  const handleSearch = async () => {
    setSearch();
  };


  const handleProfile = async () => {
    try {
      const response = await getProfielPost(username);
      const user = await getPostuser(username);

      if (response || user) {
        setPost(response);
        serUser(user);
      }
    } catch (error) {
      console.log(error);
    }
    setProfile();
  };

  const handleLikes = () => {
    setLikes();
  };

  // logout

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response) {
        alert("Logged out");
        router.push("/page/login");
      }
    } catch (error) {
      console.log("Erro in Logout ui", error);
    }
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setImg(file);
  // };

  // const handlePostSubmit = async (e) => {
  //   try {
  //     e.preventDefault();
      
  //     setPostedBy(userId)

  //     const formData = new FormData();
  //     formData.append("postedBy", postedBy);
  //     formData.append("text", text);
  //     formData.append("file", img);
    
  //   console.log('postedBy:', postedBy);
  //   console.log('text:', text);
  //   console.log('img:', img);
  //   console.log("formdata", formData)

  //   const response = await createPost(postedBy,text,img)
  //   if(response){
  //     alert("Post created")
  //   }
    
  // } catch (error) {
  //   console.log(error)
    
  // }
    
   
  
  // };
  const handleFileChange = (e) => {
    setValue('img', e.target.files[0]);
  };
  
  const handlePostSubmit = async (data) => {
    try {
      data.postedBy = userId;
      
      console.log('data:', data);
  
      const formData = new FormData();
      formData.append("postedBy", data.postedBy);
      formData.append("text", data.text);
      formData.append("img", data.img);
  
      const response = await createPost(formData);
      if (response) {
        alert("Post created");
      }
    } catch (error) {
      console.log(error);
    }
  };
  


  // creat post

  const handleCreatPost = async () => {
    document.getElementById("my_modal_2").showModal();
  };
  
  useEffect(() => {
    getUser();
    
  }, [handleProfile]);

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

        <dialog id="my_modal_2" className="modal">
          <div  className="modal-box w-full h-[300px] bg-transparent flex justify-between flex-col">
            <div className="w-full h-5 bg-transparent flex justify-evenly text-white my-2 ">
              <div className="w-3/4 text-center text-md font-bold">
                New thread
              </div>
              <div className="w-auto items-end mt-[1.5px]">
                <CgMoreO />
              </div>
            </div>
            <div className="w-full h-[400px] bg-stone-900  rounded-3xl">
              <div className="w-auto h-auto  flex justify-start  my-4 mx-3">
                <div className="h-[100px] w-8  flex justify-center flex-col gap-1 ms-2 ">
                  <div className="w-8 h-8 rounded-full bg-white"></div>
                  <div className="h-8 w-[1px] bg-opacity-20 bg-white ms-4   "></div>
                  <div className="w-3 h-3 rounded-full bg-white ms-[9px] "></div>
                </div>
                <div className="w-auto h-auto flex justify-start items-start flex-col ms-3 mt-3 relative">
                  <span className="">{username} </span>
                  <input
                    type="text"
                    name="text"
                    placeholder="Start a thead..."
                    id=""
                    onChange={(e) => setText(e.target.value)}
                    className="border-none outline-none bg-transparent"
                  />
                  <button
                    className=" h-auto px-2 py-3 bg-transparent border-none rounded-lg flex flex-col justify-center items-center"
                    onClick={handleCreatePost}
                   
                  >
                    <IoImagesOutline className="text-lg text-white text-opacity-50 hover:text-opacity-90" />
                  </button>
                  <input
                    type="file"
                    name="file"
                    id="fileInput"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) => handleFileChange(e)}
                  />
                </div>

                
              </div>
              <div className="w-auto h-auto flex justify-end px-6">
                  <button className="w-16 h-10 rounded-3xl bg-stone-800 text-black font-medium"type="submit"
                   onClick={handleSubmit(handlePostSubmit)}
                  >Post</button>
                </div>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

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
