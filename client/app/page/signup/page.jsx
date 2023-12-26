"use client";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { googleSing, signupUser } from "@/app/service/auth";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { signIn } from "next-auth/react"

// import { useGoogleLogin } from "@react-oauth/google";
// import { useCookieToken } from "@/app/service/Token";

function Signup() {
  // const { data: session } = useSession();

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
      return alert("Pleas fill althe inputs");
    }
    try {
      const response = await signupUser()
      if(response){
        alert("sinup succes");
        router.push("/page/login");
      }
    } catch (error) {
      console.log("Erron in singup")
    }
  };

  const handleChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  // const login = useGoogleLogin({
  //   flow: "auth-code",
  //   onSuccess: async (response) => {
  //     const decodedData = jwtDecode(response.credential);
  //     console.log(decodedData);
  //     await googleSing(decodedData);
  //   },
  //   onFailure: (error) => console.error("Google login error:", error),
  // });

  const handleGoogleLogin = async (res) => {
    const decoded = jwtDecode(res.credential);
    console.log(decoded)
    await googleSing(decoded)
    // setAccount(decoded);
    // await addUser(decoded);

  };
  // const handleGoogleLogin = async () => {
  //   try {
  //     // Make a POST request for Google login
  //     const response = await axios.post('http://localhost:5000/api/users/login/google');

  //     if (response.status === 200) {
  //       alert('Google login successful');
  //       // Redirect or perform additional actions as needed
  //     }
  //   } catch (error) {
  //     console.error('Error in Google login:', error.message);
  //     // Handle error
  //   }
  // };


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
        <span className="text-center text-stone-700 text-sm hover:text-white"></span>
        <div className="flex items-center gap-3">
          <hr className="w-full border-t-[1px] border-gray-500" />
          <span className="text-gray-500">or</span>
          <hr className="w-full border-t-[1px] border-gray-500" />
        </div>

        <span className="text-center my-3">
          <button
            className="bg-transparent border-y-pink-200  text-white w-80 h-12 rounded-2xl border border-white flex items-center justify-center"
            onClick={() => signIn("google")}
          >
            <FcGoogle className="mx-5" /> Continue with Google
          </button>
        </span>
      </div>
    </div>
  );
}

export default Signup;
