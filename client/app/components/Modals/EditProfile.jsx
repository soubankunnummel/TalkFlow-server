import { editProfile, getUsr } from "@/app/service/users";
import useProfileStore from "@/app/zustand/users/profileStore";
import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { BsPersonFillAdd } from "react-icons/bs";

function EditProfile() {
  const fileInputRef = useRef(null);
  let {
    profile,
    setProfile,
    username,
    setUserName,
    name,
    setName,
    email,
    setEmail,
    bio,
    setBio,
    profilePic,
    setProfilePic,
    promoimg,
    setPromoImg,
  } = useProfileStore();
  const getUser = async () => {
    try {
      const response = await getUsr();

      console.log(response);
      if (response) {
        setProfile(response);
        setUserName(response.username);
        setName(response.name);
        setEmail(response.email);
        setBio(response.bio);
        setProfilePic(response.profilePic);
      }
    } catch (error) {
      console.log("", error);
    }
  };

  const handleImageClick = (e) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (id) => {
    try {
      const response = await editProfile(id, fomdata);
      console.log(": -re", response);
      if (response) {
        return toast.success("Profile Updated");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.message);
    }
  };
  const fomdata = new FormData();
  fomdata.append("name", name);
  fomdata.append("email", email);
  fomdata.append("username", username);
  fomdata.append("bio", bio);
  fomdata.append("profilePic", profilePic);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPromoImg(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-stone-900">
          <form
            method="dialog"
            className="modal-content"
            // encType="multipart/form-data"
            onSubmit={() => handleSubmit(profile.user._id)}
          >
            {/* {console.log(profile.user._id)} */}
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <button
                    className="w-16 h-16 bg-zinc-800 rounded-full flex justify-center items-center text-2xl text-center"
                    onClick={handleImageClick}
                  >
                    {promoimg && (
                      <div
                        className="absolute inset-0 bg-cover bg-center rounded-full"
                        style={{ backgroundImage: `url(${promoimg})` }}
                      />
                    )}
                    {profilePic ? (
                      <img
                        src={profilePic}
                        alt=""
                        className="h-full w-full rounded-full"
                        style={{
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    ) : (
                      <BsPersonFillAdd />
                    )}
                  </button>
                  <input
                    type="file"
                    name="img"
                    id="fileInput"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    // onChange={(e) => setProfilePic(e.target.files[0])}
                  />
                </div>

                <div className="border-b-[1px] w-full">
                  <label htmlFor="profilePic">User Name</label>
                  <input
                    type="text"
                    className="bg-transparent w-full p-2 focus:outline-none"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="border-b-[1px] w-full">
                  <label htmlFor="bio">Bio</label>
                  <input
                    type="text"
                    className="bg-transparent w-full p-2 focus:outline-none"
                    name="bio"
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
                <div className="border-b-[1px] w-full">
                  <label htmlFor="bio">Email</label>
                  <input
                    type="text"
                    className="bg-transparent w-full  p-2 focus:outline-none"
                    name="bio"
                    id="bio"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit "
              className="w-full bg-white rounded-2xl p-3 mt-5 text-black"
            >
              Done
            </button>
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
