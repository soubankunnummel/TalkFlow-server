
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/helpers/generateTokenAndSetCookie.js'
import {v2 as cloudinary} from 'cloudinary';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import passport from 'passport';

// To see users profile

    const getUserProfile = async (req, res) => {
        const {username} = req.params
        try {
            const user = await User.findOne({username}).select("-password").select("-updatedAt")

            if(!user)return res.status(404).json({message:"user not fount"})

            res.status(200).json(user)
        } catch (error) {

        res.status(500).json({ error: error.message });
        console.log("Error in get users profile: ", error.message);
        }
    }
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
            const { username, password} = req.body
            const user = await User.findOne({username})
            const isPsswordChek = await  bcrypt.compare(password, user?.password || "")
            if( !user || !isPsswordChek ) return res.status(400).json({error:"Invalid username or password"})
    
            generateTokenAndSetCookie(user._id, res)
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email:user.email,
                username: user.username
            })
        } catch (error) {
            res.status(500).json({message:error.message})
            console.log("Err in loginuser ",error.message)
        }
        
        }

//logout user

    const logoutUser = async (req, res) => {
        try {
            res.cookie("jwt", "", {maxAge:1})
            res.status(200).json({message:"User logged out succesfully"})
        } catch (error) {
            res.status(500).json({message:error.message})
            console.log("Err in logout ",error.message)
        }
    }

// Follow UnFollow     

    const folloUnfollowUser = async (req, res) => {
    try {
        const { id } = req.params;

        const userModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id).populate('following');

        if (id === req.user._id.toString()) return res.status(400).json({ message: "You can't follow/unfollow yourself!" });

        if (!userModify || !currentUser) return res.status(400).json({ message: "User not found" });

        const isFollowing = currentUser.following && currentUser.following.includes(id);

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

// Update Usesr 

    const updateUser = async (req, res) => {
        // console.log("creaded")
        const {name, email,  username, password, bio} = req.body
        let {profilePic} = req.body

        console.log("Profiel pic form boy",profilePic)
        const userId = req.user._id

       try {
        let user = await User.findById(userId)
        if(!user) return res.status(400).json({error:"User not found"})
        
        if (req.params.id !== userId.toString())
            return res.status(400).json({error: "You can't Update other user's profile"})

        if(password){
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            user.password = hashedPassword
        }

        if(profilePic){
            if(user.profilePic){
                await cloudinary.uploader.destroy(user.profilePic.split("/").pop(".")[0])
            }
            // const uploadProfile = await cloudinary.uploader.upload(profilePic)
            // profilePic = uploadProfile.secure_url
        }

        user.name = name || user.name
        user.email = email || user.email
        user.username = username || user.username;
        user.profilePic = profilePic || user.profilePic
        user.bio = bio || user.bio

        user = await user.save()

        res.status(200).json({message:"Profile upadated succesfully",user})
       } catch (error) {
        res.status(500).json({ error: error.message });
		console.log("Error in updateUser: ", error.message);
       }
    }

// TO see all users

    const allUsers = async (req, res) => {
        try {
            const users = User.find()
            if(!users) return res.status(404).json({message:"Users Not Fount"})
            res.status(200).json({Users:users})
        } catch (error) {
            res.status(500).json({ error: error.message });
            console.log("Error in find all users: ", error.message);
        }
    }

// Googel login 
    const googleLogin = async (req, res) => {
        res.status(200).json({message:"Login Success"})
    }

    const success = async (req, res) => {
        res.json({message:"Success"})
    }
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
    export  {signupUser,loginUser, logoutUser, folloUnfollowUser, updateUser, getUserProfile, allUsers, googleLogin, success}

   // TODO: add admin  section

    //TODO: add google login
    //TODO: add forgot passwoerd