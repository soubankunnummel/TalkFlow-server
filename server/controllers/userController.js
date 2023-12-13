
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/helpers/generateTokenAndSetCookie.js'

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

    const signupUser  = async (req, res) => {
        console.log(res.body)
        const {name, email, username, password} = req.body
        const user = await User.findOne({ $or: [{email}, {username}]})
        
        if(user) {
            return res.status(400).json({error: "user alredy exists"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new User({
            name,
            email,
            username,
            password:hashedPassword
        })
        await newUser.save()
        if(newUser){ 
            generateTokenAndSetCookie(newUser._id, res)
            res.status(201).json({
                _id: newUser._id,
                name:newUser.name,
                email:newUser.email,
                username:newUser.username
            })
        }else{
            res.status(400).json({message:"Invalid user data"})
        }
    } 
    
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
        // const {id} = req.params
        const {name, email,  username, password, profilePic, bio} = req.body
        
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

    
    export  {signupUser,loginUser, logoutUser, folloUnfollowUser, updateUser, getUserProfile}