"use client";
import { forgorPassword, googleLogin, loginuser } from "@/app/service/auth";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading"; 
import { signIn, useSession } from "next-auth/react"
import toast from "react-hot-toast";
import { getPostuser, getProfielPost } from "@/app/service/users";
import usePosts from "@/app/zustand/posts/posts";
import useAuthStore from "@/app/zustand/users/authStore";

function login() {
  const { data: session , mutate} = useSession();
  const {setGoogleEmail, googleEmail,} = useAuthStore()
  const router = useRouter();
  const { setPost, serUser } = usePosts();
  const [email, setEmail] = useState("")
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  const [loading, setLoading] = useState(false);

  const hadleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }

// loging handling

  const handleLogin = async () => {
    if (login.username === "" || login.password === "")
      return toast.error("pleas fill all inputs");
      
    try {

      const response = await loginuser(login)
      if (response) {
        setLoading(true)
        const post = await getProfielPost(login.username);
        const user = await getPostuser(login.username);
        if(post && user) {
          await setPost(post)
          await serUser(user)
        }
         router.push("/")
      } else {
         toast.error("Invalid username or password")
       
      }
    } catch (error) {
      console.error("Error in handleLogin", error);
      setLoginError("An error occurred during login");
    }
  }

// google login

useEffect(() => {
  if (session && session.user) {

    setGoogleEmail(session.user.email);
  }
},[session ])

const handleGoogleLogin = async () => {
  try {
    // await signIn("google")
    // await mutate(null)
    // await Glogin()
    //  {
      // onSuccess: async (session) => {
      //   // await mutate(null);
      //   await Glogin(); 
      // },
    // });

    await signIn("google", {
      onSuccess: async (session) => {
        await mutate(null); 
        await Glogin(); 
      },
    });
  } catch (error) {
    console.error("Error in handleGoogleLogin", error);
  }
};

async function Glogin () {
  try {
    const userData = {
      email:googleEmail
    }
    console.log("googleemio- workign",googleEmail)
      const response =  await googleLogin(userData)
      console.log("resopons",response)
      if(response){
        toast.success("login success..")
        router.push("/")

      }
     
      
    } catch (error) {
      console.log(error)
    }

}


  const handleForgot = async (e) => {
    try {

      document.getElementById('my_modal_5').showModal()
      setEmail(e.target.value)
    } catch (error) {
      console.log("Error In modal");
    }
  }

// forgot passwoerd

  const handleSubmit = async (e) => {
  if (!email)  return window.alert("Please enter your email");
    setLoading(true)
 
    e.preventDefault()
    try {
      console.log('Email entered:', email);
        document.getElementById('my_modal_5').close()
        const response = await forgorPassword(email)
        if(response){
          setLoading(false)
          toast.success("OTP sented to your email")
          router.push("/page/verify")
        }
    } catch (error) {
      console.log("Error in forgot passwoer",error)
    } 
  }
  return (
    <>
    
    {loading ? <Loading/> : (
      <>
      <div className="w-full h-screen flex justify-center items-center ">
        <div className="flex flex-col justify-between gap-3 ">
          <input
            type="text"
            placeholder="Username or Email"
            name="username"
            value={login.username}
            onChange={hadleChange}
            required
            className="w-80 placeholder:ps-3 h-12 rounded-2xl bg-stone-800 p-3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={login.password}
            onChange={hadleChange}
            required
            className="w-80 placeholder:ps-3 h-12 rounded-2xl bg-stone-800 p-3"
          />

          <button
            className="bg-white text-black w-80 h-12 rounded-2xl"
            onClick={handleLogin}
          >
            Log in
          </button>
          <span className="text-center text-stone-700 text-sm hover:text-white">
            <a href="#" onClick={handleForgot} className="">
              Forgot Password?
            </a>
          </span>
          <span className="text-center text-stone-700 text-sm hover:text-white">
            <a href="#" onClick={() => router.push("/page/signup")} className="">
              Create Account 
            </a>
          </span>
          
          <div className="flex items-center gap-3">
            <hr className="w-full border-t-2 border-gray-500" />
            <span className="text-gray-500">or</span>
            <hr className="w-full border-t-2 border-gray-500" />
          </div>

          <span className="text-center my-3">
            <button
              className="bg-transparent border-y-pink-200  text-white w-80 h-12 rounded-2xl border border-white flex items-center justify-center"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="mx-5" /> Continue with Google
            </button>
          </span>
        </div>
      </div>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-stone-900 flex justify-center items-center gap-x-7 ">
          
         <input type="text"placeholder="Enter you Email hete " name="email" id=""  value={email} className="w-[200px] h-[40px] rounded-md bg-transparent p-3  " 
         onChange={handleForgot}
         />
          <div className="modal-action">
            <form method="dialog" onSubmit={handleSubmit}>
              <button type="submit" className="btn mb-4">Submit</button>
            </form>
          </div>
        </div>
      </dialog>
      </>
    )}
    </>
  );
}

export default login;
