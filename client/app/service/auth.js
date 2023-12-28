// auth.js
import axios from "axios";
import Axios from "./axios";
import useToken from "./context";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// const { setToken: setCookieToken } = useToken();
// export default function Auth() {


  const signupUser = async (signup) => {
    try {
      const response = await Axios.post(`${baseUrl}/api/users/signup`, signup);
      const token = response.data.token
      localStorage.setItem("jwt",token)
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const googleSing = async (data) => {
    try {
      const response = await Axios.post(
        `/api/users/login/google`,
        data
        );
        return response.data;
      } catch (error) {
        console.log("Error in Google login", error);
      }
    };
    
    const loginuser = async (data) => {
      try {
        const response = await Axios.post(`${baseUrl}api/users/login`, data);
        if (response.status === 200) {
          const token = response.data.token;
          localStorage.setItem("jwt",token)
          // setCookieToken(token);
          console.log(token)
          return response.data;
        }
      } catch (error) {
        console.log("Error in login", error);
      }
    };


// log out user



    const logoutUser = async () => {
      try {
        const response = await Axios.post(`/api/users/logout`); 
            
        if (response.status === 200) {
          document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          return response.data.message;
        }
      } catch (error) {
        console.log("Error in Logout", error);
      }
    };
    
  //   return null
  // }

// forgot passwoer 

    const forgorPassword = async (email) => {
      try {
        const response = await Axios.post(`/api/users/forgot-password`,{
          email:email
        })
        if(response.status === 200){
          return response.data
        }
      } catch (error) {
        console.log("Error in ForgotPassword")
      }
    }

// Verify otp

    const verifyOtp = async (email, otp) => {
      try {
        const response = await Axios.post(`/api/users/verify-otp`,{
          email, otp
        })
        if(response.status === 200) {
          return response.data
        }
      } catch (error) {
        console.log("Error in verfiy OTP")
      }
    }

// Rset password

    const resetPassword = async (email,newPassword) => {
      try {
        const response = await Axios.post(`/api/users/reset-password`,{
          email,newPassword
        })
        if(response.status === 200) {
          return response.data
        }
      } catch (error) {
        console.log("Error in Reset passwoerd",error)
      }
    }
  export { signupUser, googleSing, loginuser, logoutUser, forgorPassword, verifyOtp, resetPassword};
  