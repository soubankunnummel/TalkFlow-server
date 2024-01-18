import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";
import { v2 as cloudinary } from "cloudinary";
import randomstring from "randomstring";
import nodemailer from "nodemailer";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Post from "../models/postModel.js";
// import passport, { use } from 'passport';

// To see users profile

const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username })
      .select("-password")
      .select("-updatedAt")

    if (!user) return res.status(404).json({ message: "user not fount" });

    const posts = await Post.find({ postedBy: user.id }).sort({createdAt: -1})

    const userProfileWithPosts = {
      user: {
        _id: user._id,
        username: user.username,
        post: user.text,
      },
      posts: posts,
    };

    res.status(200).json(userProfileWithPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in get users profile: ", error.message);
  }

};

// get Profil with profile pic

const getProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username })
      .select("-password")
      .select("-updatedAt")
      .populate("followers");
    const follow = await User.findOne({ username })
      .select("-password")
      .select("-updatedAt")
      .populate("following");

    const following = follow.following;
    //    console.log(following)

    if (!user) return res.status(404).json({ message: "user not fount" });

    res.status(200).json({ user, following });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in get users profile: ", error.message);
  }
};

// singup user

const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      username: newUser.username,
    });
  } catch (error) {
    console.error("Error in signupUser:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// login user

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPsswordChek = await bcrypt.compare(password, user?.password || "");
    if (!user || !isPsswordChek)
      return res.status(400).json({ error: "Invalid username or password" });

    generateTokenAndSetCookie(user._id, res);
    // console.log( generateTokenAndSetCookie(user._id, res))
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      token: generateTokenAndSetCookie(user._id, res),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Err in loginuser ", error.message);
  }
};

//logout user

const logoutUser = async (req, res) => {
  console.log(req.body);
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Err in logout ", error);
  }
};

// Follow UnFollow

const folloUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id).populate("following");


    if (id === req.user._id.toString())
      return res
        .status(400)
        .json({ message: "You can't follow/unfollow yourself!" });

    if (!userModify || !currentUser)
      return res.status(400).json({ message: "User not found" });

    const isFollowing = currentUser.following.map(user => user._id.toString()).includes(id);
    console.log("isfollowing: ",currentUser.following)
    if (isFollowing) {
      // unfollow user

      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      // follow user
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      res.status(200).json({ message: "User followed successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in folloUnfollowUser: ", error.message);
  }
};

// check user name is exist

    export const isUserName = async (req, res) => {
      const {username} = req.body
      try {
        if(await User.findOne({username})){ 
          return  res.status(400).json({message:"Username alredy taken"})
         }
         res.status(200).json({message:"User name avilable"})
      } catch (error) {
        console.log("Error in check user name")
      }

    }


// Update Usesr

const updateUser = async (req, res) => {
  // console.log("creaded")
  const { name, email, username, password, bio } = req.body; 
  console.log("profile updae ",req.body)
  let { profilePic } = req.body;

  console.log("Profiel pic form boy", profilePic);
  const userId = req.user._id;
 console.log( req.user._id)
  try {
    let user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: "User not found" });

    if(await User.findOne({username})){ 
      return  res.status(400).json({message:"Username alredy taken"})
     }
 

    if (req.params.id !== userId.toString())
      return res
        .status(400)
        .json({ error: "You can't Update other user's profile" });

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    if (profilePic) {
      if (user.profilePic) {
        await cloudinary.uploader.destroy(
          user.profilePic.split("/").pop(".")[0]
        );
      }
      // const uploadProfile = await cloudinary.uploader.upload(profilePic)
      // profilePic = uploadProfile.secure_url
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;

    user = await user.save();

    res.status(200).json({ message: "Profile upadated succesfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in updateUser: ", error.message);
  }
};

// TO see all users

const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(404).json({ message: "Users Not Fount" });
    res.status(200).json({ Users: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in find all users: ", error.message);
  }
};

// google signup

export const googleSignup = async (req, res) => {
  try { 
    const { username, email, profilePic } = req.body;
    console.log("resbody:",username, email, profilePic)
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(400).json({ error: "Allredy registred" });
    }

    const newUser = new User({
      username,
      email,
      profilePic: profilePic,
    }); 

    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res);
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      profilePic: newUser.profilePic,
      token: generateTokenAndSetCookie(newUser._id, res),
    });
  } catch (error) {
    console.error("Error in google Signup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Googel login

const googleLogin = async (req, res) => {
  // console.log(req)

  try {
    const {  email } = req.body;
    console.log(email,"formbody")
    let user = await User.findOne({email });

    if(!user) return res.status(404).json({message:"Invalid Email"})
    
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      message:"login success",
      _id: user._id,  
      email: user.email,
      username: user.username, 
      profilePic: user.profilePic,
      bio: user.bio,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error("Error in loginWithGoogle ", error.message);
  }
};
// forgot passwoer

const fogotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const otp = randomstring.generate({ length: 6, charset: "numeric" });

    user.resetPasswordOTP = otp;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}`,
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error, "info:", info);
        return res.status(500).json({ error: "Failed to send OTP email" });
      }
      console.log("working")

      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "OTP sent to your email" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error("Error in Forgot password: ", error.message);
  }
};

// validate otp

const validateOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log(otp);
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    function isOtpExpired(otpGeneratedAt) {
      const expirationTimeInMinutes = 15;
      const now = new Date();
      const otpGeneratedTime = new Date(otpGeneratedAt);

      return now - otpGeneratedTime > expirationTimeInMinutes * 60 * 1000;
    }

    if (
      otp !== user.resetPasswordOTP &&
      isOtpExpired(user.resetPasswordOTPGeneratedAt)
    ) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    res.status(200).json({ message: "OTP validation successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error("Error in validateOTP", error.message);
  }
};

// Reset passwoerd

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ error: "New password must be at least 6 characters long" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword; 
    user.resetPasswordOTP = null;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error("Error in resetPassword", error.message);
  }
};

// const googleLogin = async (req, res) => {
//     console.log(req.body)
//     // Google login logic
//     // Implement the logic to handle the Google login callback and user creation if not exists

//     try {
//         const { id, displayName, emails } = req.user;
//         let user = await User.findOne({ googleId: id });

//         if (!user) {
//             user = await User.create({
//                 username: displayName,
//                 email: emails[0].value,
//                 googleId: id,
//             });
//         }

//         generateTokenAndSetCookie(user._id, res);

//         res.status(200).json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             username: user.username,
//             profilePic: user.profilePic,
//             bio: user.bio,
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//         console.error('Error in loginWithGoogle ', error.message);
//     }
// };

// get logind user

const getUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error("Error in getUser ", error.message);
  }
};

// get followsers

const getFollowers = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("followers");
    // console.log("user:-",user)

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error("Error in getUser ", error.message);
  }
};

export {
  signupUser,
  loginUser,
  logoutUser,
  folloUnfollowUser,
  updateUser,
  getUserProfile,
  allUsers,
  googleLogin,
  fogotPassword,
  resetPassword,
  validateOTP,
  getUser,
  getFollowers,
  getProfile,
};

// TODO: add admin  section
