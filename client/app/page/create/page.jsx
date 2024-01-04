"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from "react";
import { IoImagesOutline } from "react-icons/io5";
import { CgMoreO } from "react-icons/cg";
import { useForm } from 'react-hook-form';
import usePostsStore from '@/app/zustand/posts/postStroe';  // Corrected the import path
import { getUsr } from '@/app/service/users';
import { createPost } from '@/app/service/post';
import toast from 'react-hot-toast';

const CreatePostModal = () => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const { register, handleSubmit, reset } = useForm();
  const [img, setImg] = useState(null)
  const { postedBy, setPostedBy, setUserName, username } = usePostsStore();  // Corrected the function name

  const getUser = async () => {
    try {
      const response = await getUsr();

      if (response) {
        setUserName(response.username);
        setPostedBy(response._id);
      }
    } catch (error) {
      console.log("Error in nave bar");
    }
  };



  const handleCreatePost = async (data) => {
    try {
      const formData = new FormData();
      formData.append("postedBy", postedBy);
      formData.append("text", data.text);
      if (img) {
        formData.append("img", img);
      }
   

      const response = await createPost(formData);
      if (response) {
        toast.success("Post created");
        reset()
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageClick = (e) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <form onSubmit={handleSubmit(handleCreatePost)} encType="multipart/form-data">
        <div className="w-full h-full max-w-lg mx-auto p-6 bg-stone-900 rounded-3xl">
          <div className="w-full h-5 flex justify-between">
            <div className="w-3/4 mx-20 text-md font-bold text-white">
              New thread
            </div>
            <div className="w-auto items-end">
              <CgMoreO />
            </div>
          </div>
          <div className="w-full h-[400px]">
            <div className="w-full h-auto flex justify-start my-4">
              <div className="w-auto h-auto  flex justify-start  my-4 mx-3">
                <div className="h-[100px] w-8  flex justify-center flex-col gap-1 ms-2 ">
                  <div className="w-8 h-8 rounded-full bg-white"></div>
                  <div className="h-8 w-[1px] bg-opacity-20 bg-white ms-4   "></div>
                  <div className="w-3 h-3 rounded-full bg-white ms-[9px] "></div>
                </div>
                <div className="w-auto h-auto flex justify-start items-start flex-col ms-3 mt-3 relative">
                  <span className=" w-full h-9 text-white">{username}</span>
                  <input
                    type="text"
                    name="text"
                    placeholder="Start a thread..."
                    id=""
                    {...register('text')}
                    className="border-none outline-none bg-transparent"
                  />
                  <button
                    className="h-auto px-2 py-3 bg-transparent border-none rounded-lg flex flex-col justify-center items-center"
                    onClick={handleImageClick}
                  >
                    <IoImagesOutline className="text-lg text-white text-opacity-50 hover:text-opacity-90" />
                  </button>
                  <input
                    type="file"
                    name="img"
                    id="fileInput"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) => setImg(e.target.files[0])} 
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-auto flex justify-end px-6">
              <button
                className="w-16 h-10 rounded-3xl bg-stone-800 text-black font-medium"
                type="submit"
              >
                Post
              </button>
            </div>
          </div>
          <div className="absolute  bottom-4 right-4 lg:bottom-auto lg:top-4 lg:right-4">
            <button
              className="text-white text-opacity-50 hover:text-opacity-90"
              onClick={() => router.push("/")}
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreatePostModal;
