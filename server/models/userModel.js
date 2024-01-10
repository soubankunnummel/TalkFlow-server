import mongoose from "mongoose";

const userSchima = mongoose.Schema({
    name:{
        type:String,
        required:false,
    },
    username: {
        type:String,
        required:true,
        unique:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String, 
        minLength:6,
        required:false,
    },
    profilePic: {
        type: String,
        default: "",
    },
    followers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      following: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    bio: {
        type: String,
        default: "",
    },
    isFrozen: {
        type: Boolean,
        default: false,
    }, 
    resetPasswordOTP: {
        type: String,
        default: null,
    },
    resetPasswordOTPGeneratedAt: {
        type: Date,
        default: null,
    },
    repliedPosts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Post",
        default: [],
    },
},{
    timestamps: true,
}
)
const User = mongoose.model("User", userSchima)
export default User