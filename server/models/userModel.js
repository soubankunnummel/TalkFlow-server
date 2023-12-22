import mongoose from "mongoose";

const userSchima = mongoose.Schema({
    name:{
        type:String,
        required:true,
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
        required:true,
    },
    profilePic: {
        type: String,
        default: "",
    },
    followers: {
        type: [String],
        default: [],
    },
    following: {
        type: [String],
        default: [],
    },
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
},{
    timestamps: true,
}
)
const User = mongoose.model("User", userSchima)
export default User