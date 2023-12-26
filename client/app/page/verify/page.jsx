"use client"
import Loading from "@/app/components/Loading";
import { verifyOtp } from "@/app/service/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

function VerifyOtp() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
    email: "",
    otp: "",
  });

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    if(!data.email || !data.otp) return alert("Please fill all inputs")
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    alert("Please enter a valid email address");
    return;
  }
    setLoading(true)

    try {
      const { email, otp } = data;
      const response = await verifyOtp(email, otp)
      if(response){
        router.push("/page/reset")
      }
      
    } catch (error) {
        console.log("Error in Verification",error)
        console.error("Error in verification", error);
    }
  };

  return (
    <>
    {loading ?  <Loading/> : (

        <div className="w-full h-screen bg-black flex flex-col justify-center items-center gap-4">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleInputChange}
            className="w-80 placeholder:ps-3 h-12 rounded-2xl bg-stone-800 p-4"
          />
          <input
            type="text"
            name="otp"
            placeholder="OTP"
            value={data.otp}
            onChange={handleInputChange}
            className="w-80 placeholder:ps-3 h-12 rounded-2xl bg-stone-800 p-4"
            />
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-md bg-white text-black"
            >
            Verify
          </button>
        </form>
      </div>
    )}
    </>
  );
}

export default VerifyOtp 
