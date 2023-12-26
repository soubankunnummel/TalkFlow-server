import { IoIosMore } from "react-icons/io";
import { MdAddCircle } from "react-icons/md";
import { FaInstagram } from "react-icons/fa6";

function Profile() {
  return (
    <>
      <div className="w-full md:w-[580px] h-full  md:p-2 p-3 flex flex-col  justify-between items-center mb-10 ">
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
              <span className="mt-4 text-white text-opacity-20 ms-5">
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

          {/* <div className="h-ful w-fit">
              <div className="w-fit h-full  flex flex-col items-center gap-3">
              <div
            className="h-10 w-10 rounded-full bg-white box-border "
            style={{
              backgroundImage:
                "url('https://img.freepik.com/free-photo/people-holding-wechat-icon_53876-63371.jpg?size=626&ext=jpg&ga=GA1.1.1677573732.1702106196&semt=ais')",
              backgroundSize: "contain",
            }}
            >
           
            <button className=" relative top-5 left-5  ">
              <MdAddCircle className="text-2xl hover:inset-5 " />
            </button>

          </div>
            <div className="h-[450px] w-[1px] bg-white bg-opacity-30 rounded-lg"></div>
              </div>
            </div> */}
          {/* <div className="w-full h-full bg-black flex flex-col">
                <div className="w-full flex m-3 justify-between gap-3 items-center">
                  <span className="font-medium text-white">souban</span>
                  <div className="flex justify-between gap-3 items-center ">
                    
                  <span className="text-xs text-opacity-40 text-white">14 h</span>

                <button >

                <IoIosMore className="text-white"/>
                </button>
                </div>
                  </div>
                <div className="h-[400px] w-full bg-white m-2"></div>
                 </div> */}
        </div>
        <button className="w-full h-9 bg-transparent border border-solid text-center rounded-md mt-3">
          Edit Profile
        </button>
          <div className="w-full h-9 bg-white flex justify-between items-center text-black text-center mt-2">
                 <div>threads</div>
                 <div>Repliese</div>
                 <div>Reposts</div>
          </div>

      </div>
    </>
  );
}
export default Profile;
