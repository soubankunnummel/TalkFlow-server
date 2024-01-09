"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { resetPassword } from "@/app/service/auth";
import toast from "react-hot-toast";

function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || newPassword === "") {
      alert("Please enter your email and new password");
      return;
    }

    setLoading(true);

    try {
      const response = await resetPassword(email, newPassword);

      if (response) {
        toast.success("Password reset successful");
        router.push("/page/login")
      }
    } catch (error) {
      console.log("Error in password reset", error);
    } finally {
      setLoading(false);
    }
  };

  return ( 
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <div className="flex flex-col justify-between gap-3">
            <input
              type="text"
              placeholder="Enter your Email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="w-80 placeholder:ps-3 h-12 rounded-2xl bg-stone-800 p-3"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new Password"
                name="newPassword"
                value={newPassword}
                onChange={handlePasswordChange}
                required
                className="w-80 placeholder:ps-3 h-12 rounded-2xl bg-stone-800 p-3"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-3 top-3 text-stone-300"
              >
                {showPassword ? (
                  <RiEyeOffFill size={24} />
                ) : (
                  <RiEyeFill size={24} />
                )}
              </button>
            </div>

            <button
              className="bg-white text-black w-80 h-12 rounded-2xl"
              onClick={handleSubmit}
            >
              Reset Password
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ResetPassword;
