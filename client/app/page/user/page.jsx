"use client";
import { FaInstagram } from "react-icons/fa6";
import Threads from "@/app/components/Threads";
import Replies from "@/app/components/Replies";
import Reposts from "@/app/components/Reposts";
import ProfilePost from "@/app/components/ProfilePost";
import RepliPost from "@/app/components/ProfileRepliPost";
import usePosts from "@/app/zustand/posts/posts";
import ProfilRepos from "@/app/components/ProfilRepos";
import { getProfile, getUsr } from "@/app/service/users";
import { useEffect } from "react";
import useProfileStore from "@/app/zustand/users/profileStore";

var username;
var userId;
function UserProfile() {
  const { selected } = usePosts();
  const { profile } = useProfileStore();


  return (
    <>
      <div className="w-full md:w-[580px] h-full  md:p-2 p-3 flex flex-col  justify-between items-center   ">
        <div className="h-auto w-full flex justify-between   p-2">
          <div className=" w-1/2 h-auto flex flex-col justify-start">
            <span>{profile.user && profile.user.name} </span>

            {/* user name and btn */}

            <div className="flex gap-6">
              <span>{profile.user && profile.user.username} </span>
              <button className="bg-stone-900 w-[100px] rounded-xl text-white text-opacity-20 ">
                threas.net
              </button>
            </div>

            <div className="flex justify-stretch ">
              <div
                className="w-4 h-4 rounded-full bg-white mt-5"
                style={{
                  backgroundImage:
                    "url('https://img.freepik.com/free-photo/people-holding-wechat-icon_53876-63371.jpg?size=626&ext=jpg&ga=GA1.1.1677573732.1702106196&semt=ais')",
                  backgroundSize: "contain",
                }}
              ></div>
              <div
                className="w-4 h-4 rounded-full bg-white mt-5 "
                style={{
                  backgroundImage:
                    "url('https://img.freepik.com/free-photo/people-holding-wechat-icon_53876-63371.jpg?size=626&ext=jpg&ga=GA1.1.1677573732.1702106196&semt=ais')",
                  backgroundSize: "contain",
                }}
              ></div>
              <span className="mt-4 text-white text-opacity-20 ms-5 hover:underline">
                {" "}
                {profile.user &&  profile.user.followers.length } following
              </span>
            </div>
          </div>
          <div className="flex justify-end flex-col ">
            <div
              className="h-16 w-16 rounded-full bg-white box-border md:h-20 md:w-20"
              style={{
                backgroundImage: `url(${
                  profile.user &&
                     profile.user.profilePic ?  profile.user.profilePic :"https://i0.wp.com/www.spielanime.com/wp-content/uploads/2023/07/jujutsu-kaisen-season-1-recap-before-season-2.jpg?fit=1024%2C576&ssl=1"
                     
                    })`,
                    backgroundSize: "cover",
                   backgroundPosition: "center",
              }}
            ></div>
            <div className="text-2xl ml-12 mt-5">
              <FaInstagram />{" "}
            </div>
          </div>
        </div>
        <button className="w-full h-10 bg-transparent border border-opacity-20 border-white text-center rounded-md mt-3">
          Edit Profile
        </button>
        <div className="w-full h-full  flex justify-evenly items-center  text-white text-center mt-2 p-3">
          <Threads />
          <Replies />
          <Reposts />
        </div>
      </div>

      {selected === "repliPost" && <RepliPost />}
      {selected === "repost" && <ProfilRepos />}
  
      {!selected && <ProfilePost />}
    </>
  );
}
export default UserProfile;
