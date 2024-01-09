"use client";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { googleSing, signupUser } from "@/app/service/auth";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { signIn, useSession } from "next-auth/react";
import useAuthStore from "@/app/zustand/users/authStore";
import toast from "react-hot-toast";

// import { useGoogleLogin } from "@react-oauth/google";
// import { useCookieToken } from "@/app/service/Token";
let username
let email
let userData

function Signup() {
  const { data: session , mutate} = useSession();
  const {
    googleUserName,
    setGoogleUserName,
    setGoogleEmail,
    googleEmail,
    setGoogleProfile,
    googleProfile,
  } = useAuthStore();

  const router = useRouter();
  const [signup, setSignup] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  // const { setToken: setCookieToken } = useCookieToken();

  const handleSignup = async () => {
    if (
      signup.username === "" ||
      signup.name === "" ||
      signup.email === "" ||
      signup.password === ""
    ) {
      return toast.error("Pleas fill althe inputs");
    }
    try {
      const response = await signupUser(signup);
      if (response) {
        toast.success("sinup succes");
        router.push("/page/login");
      }
    } catch (error) {
      toast.error("User alredy registred")
      
      console.log("Erron in singup",error);
    }
  };

  const handleChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };







  useEffect(() => {
    if (session && session.user) {
      setGoogleUserName(session.user.name);
      setGoogleEmail(session.user.email);
      setGoogleProfile(session.user.image);
    }
  }, [session]);


  const handleGoogleLogin = async () => {
    try {
      await signIn("google");

      // Access the values directly from the state
      const userData = {
        username: googleUserName,
        email: googleEmail,
        profilePic: googleProfile,
      };

      // Call the googleSing function with userData
      const response = await googleSing(userData);
      if(response){

        mutate(null);
        return router.push("/page/login");
      }
  
    } catch (error) {
      console.log(error);
    }
  };

  // if(userData){
  //    googleSing(userData);
  //   return router.push("/page/login");
  // }




  // if (response?.error) {
  //   console.error("Error during Google login:", response.error);
  // } else if (response?.ok) {
  //   const decoded = response.data;

  //   // Access and log desired user data:
  //   const { id, displayName, emails } = decoded;
  //   console.log("User Information:", {
  //     id,
  //     displayName,
  //     emails,
  //   });

  //
  // }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col justify-between gap-3">
        <div className="w-80 gap-2 h-auto flex">
          <input
            type="text"
            placeholder="Name"
            name="name"
            required
            value={signup.name}
            onChange={handleChange}
            className="w-1/2 placeholder:ps-2 h-12 rounded-2xl p-3 bg-stone-800"
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            value={signup.username}
            onChange={handleChange}
            className="w-1/2 placeholder:ps-2 h-12 p-3 rounded-2xl bg-stone-800"
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          name="email"
          required
          value={signup.email}
          onChange={handleChange}
          className="w-full placeholder:ps-2 h-12 rounded-2xl bg-stone-800 p-3"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          value={signup.password}
          onChange={handleChange}
          className="w-full placeholder:ps-2 h-12 rounded-2xl bg-stone-800 p-3"
        />

        <button
          className="bg-white text-black w-80 h-12 rounded-2xl"
          onClick={handleSignup}
        >
          Sign Up
        </button>

        <span className="text-center text-stone-700 text-sm hover:text-white">
          <a href="#" onClick={() => router.push("/page/login")} className="">
            Alredy have Account ?
          </a>
        </span>
        <span className="text-center text-stone-700 text-sm hover:text-white"></span>
        <div className="flex items-center gap-3">
          <hr className="w-full border-t-[1px] border-gray-500" />
          <span className="text-gray-500">or</span>
          <hr className="w-full border-t-[1px] border-gray-500" />
        </div>

        <span className="text-center my-3">
          <button
            className="bg-transparent border-y-pink-200  text-white w-80 h-12 rounded-2xl border border-white flex items-center justify-center"
            onClick={handleGoogleLogin}
          >
            <FcGoogle className="mx-5" /> Signup with Google
          </button>
        </span>
      </div>
    </div>
  );
}

export default Signup;
