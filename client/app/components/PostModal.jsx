// CreatePostModal.js
import React, { useRef } from "react";
import { IoImagesOutline } from "react-icons/io5";
import { CgMoreO } from "react-icons/cg";

const CreatePostModal = ({
  username, 
  setText,
  handleFileChange,
  handlePostSubmit,
}) => {
  const fileInputRef = useRef(null);

  const handleCreatePost = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box w-full h-[300px] bg-transparent flex justify-between flex-col">
        <div className="w-full h-5 bg-transparent flex justify-evenly text-white my-2 ">
          <div className="w-3/4 text-center text-md font-bold">New thread</div>
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
            <button
              className="w-16 h-10 rounded-3xl bg-stone-800 text-black font-medium"
              type="submit"
              onClick={handlePostSubmit}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default CreatePostModal;
