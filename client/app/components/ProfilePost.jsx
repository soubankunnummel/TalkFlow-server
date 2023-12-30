"use client";
import React, { useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { MdAddCircle } from "react-icons/md";
import Like from "./Like";
import Coment from "./Coment";
import Repost from "./Repost";
import Share from "./Share";
import Loading from "./Loading";
import usePosts from "../zustand/posts/posts";

function ProfilePost() {
  const [loading, setLoading] = useState(false);
  const { post, user } = usePosts();

  if (!post) {
     return setLoading(true);
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {post.map((item) => (
            <div
              className=" w-full md:w-[580px] h-auto  md:p-2 p-3 flex flex-col relative top-[-27px]  justify-between items-center mb-10 "
              key={item._id}
            >
              <div className="h-auto w-full bg-black border-t-[1px] border-white flex border-opacity-30 p-2">
                <div className="h-ful w-fit">
                  <div className="w-fit h-full  flex flex-col items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-full bg-white box-border "
                      style={{
                        backgroundImage: `url(${item.profilePic})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                      }}
                    >
                      <button className=" relative top-5 left-5  ">
                        <MdAddCircle className="text-2xl hover:inset-5 " />
                      </button>
                    </div>
                    <div className="  h-fit md:h-[450px] w-[1px] bg-white bg-opacity-30 rounded-lg"></div>

                    <div className="w-10 h-10 relative flex justify-center">
                      <div className="w-5 h-5 bg-black absolute top-0 right-0 rounded-full"
                     style={{
                      backgroundImage:
                        "url('https://img.freepik.com/free-photo/people-holding-wechat-icon_53876-63371.jpg?size=626&ext=jpg&ga=GA1.1.1677573732.1702106196&semt=ais')",
                      backgroundSize: "contain",
                    }}
                      ></div>
                      <div className="w-4 h-4 bg-black absolute top-2 left-1 rounded-full"
                      
                      style={{
                        backgroundImage:
                          "url('https://img.freepik.com/free-photo/people-holding-wechat-icon_53876-63371.jpg?size=626&ext=jpg&ga=GA1.1.1677573732.1702106196&semt=ais')",
                        backgroundSize: "contain",
                      }}></div>
                      <div className="w-3 h-3 bg-black absolute bottom-1 left-4 rounded-full"
                      
                      style={{
                        backgroundImage:
                          "url('https://img.freepik.com/free-photo/people-holding-wechat-icon_53876-63371.jpg?size=626&ext=jpg&ga=GA1.1.1677573732.1702106196&semt=ais')",
                        backgroundSize: "contain",
                      }}></div>
                    </div>
                    
                  </div>
                </div>
                <div className=" w-full h-full bg-black flex flex-col">
                  <div className="w-full flex m-3 justify-between gap-3 items-center">
                    <span className="font-medium text-white hover:underline">
                      {user.username}{" "}
                    </span>
                    <div className="flex justify-between gap-3 items-center ">
                      <span className="text-xs text-opacity-40 text-white">
                        14 h
                      </span>

                      <button className=" w-7 h-7 rounded-full hover:bg-stone-900 active:scale-[90%] flex justify-center items-center">
                        <IoIosMore className="text-white" />
                      </button>
                    </div>
                  </div>

                  <div className="h-fit w-auto  md:h-[400px] m-2">
                    <p className="my-2 mx-2">{item.text}</p>
                    <div className=" w-fit h-fit md:h-full md:w-full rounded-xl ">
                      <img
                        className="rounded-xl  w-full h-full "
                        src={item.img}
                        alt="Post images"
                      />
                    </div>
                  </div>

                  <div className="flex gap-1 mx-2 mt-10 items-center">
                    <Like /> <Coment /> <Repost /> <Share />
                  </div>
                  <div className="w-auto h-3 text-white text-opacity-20 gap-2 flex ms-3">
                    <span>72 replies</span>
                    <span>500 likes</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default ProfilePost;
