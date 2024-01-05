import React from "react";

function EditProfile() {



  
  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-stone-900">
          <form method="dialog" className="modal-content">
            <div className="w-full h-full flex flex-col justify-center items-center gap-y-2 text-white">
              <div className="w-full h-full flex flex-col gap-y-2 text-white">
                <div className="w-full h-full flex justify-between ">

 

                <div className="border-b-[1px] w-9/12">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    className="bg-transparent w-full p-2 focus:outline-none"
                    name="name"
                    id="name"
                    />
                </div>
                <div className="w-16 h-16 bg-blue-700 rounded-full">
                  <img src="https://www.shutterstock.com/image-vector/young-man-anime-style-character-600nw-2313503433.jpg" alt=""  className="rounded-full"/>
                </div>

                    </div>

                <div className="border-b-[1px] w-full">
                  <label htmlFor="profilePic">User Name</label>
                  <input
                    type="text"
                    className="bg-transparent w-full p-2 focus:outline-none"
                    name="profilePic"
                    id="profilePic"
                  />
                </div>
                <div className="border-b-[1px] w-full">
                  <label htmlFor="bio">Bio</label>
                  <input
                    type="text"
                    className="bg-transparent w-full p-2 focus:outline-none"
                    name="bio"
                    id="bio"
                  />
                </div>
                <div className="border-b-[1px] w-full">
                  <label htmlFor="bio">Email</label>
                  <input
                    type="text"
                    className="bg-transparent w-full  p-2 focus:outline-none"
                    name="bio"
                    id="bio"
                  />
                </div>
              </div>
            </div>

            <button type="submit " className="w-full bg-white rounded-2xl p-3 mt-5 text-black">Done</button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </>
  );
}

export default EditProfile;
