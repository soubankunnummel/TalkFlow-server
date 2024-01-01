import { IoIosMore } from "react-icons/io";
import { MdAddCircle } from "react-icons/md";
import { FaInstagram } from "react-icons/fa6";
import Threads from "@/app/components/Threads";
import Replies from "@/app/components/Replies"; 
import Reposts from "@/app/components/Reposts";
import ProfilePost from "@/app/components/ProfilePost";
import RepliPost from "@/app/components/ProfileRepliPost";
import usePosts from "@/app/zustand/posts/posts";
import ProfilRepos from "@/app/components/ProfilRepos";

function Profile() {
  const {selected } = usePosts()  
  return (
    <>
      <div className="w-full md:w-[580px] h-full  md:p-2 p-3 flex flex-col  justify-between items-center   ">
        <div className="h-auto w-full flex justify-between   p-2">
          <div className=" w-1/2 h-auto flex flex-col justify-start">
            <span>souban</span>

            {/* user name and btn */} 

            <div className="flex gap-6">
              <span>usename </span>
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
                133 follower
              </span>
            </div>
          </div>
          <div className="flex justify-end flex-col ">
            <div
              className="h-16 w-16 rounded-full bg-white box-border md:h-20 md:w-20"
              style={{
                backgroundImage:
                  "url('https://img.freepik.com/free-photo/people-holding-wechat-icon_53876-63371.jpg?size=626&ext=jpg&ga=GA1.1.1677573732.1702106196&semt=ais')",
                backgroundSize: "contain",
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
                 <Threads/>
                 <Replies/>
                 <Reposts/>
                 
          </div> 
          

      </div>
    
      {selected === 'repliPost'  && <RepliPost/>}
      {selected === 'repost' && <ProfilRepos/> }
      {!selected && <ProfilePost/>}
     

      
    </>
  );
}
export default Profile;
