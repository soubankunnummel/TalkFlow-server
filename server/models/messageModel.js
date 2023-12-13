import mongoose from "mongoose";

const messgeSchema = mongoose.Schema(
    {
        conersationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Conversation",
            
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"

        },
        text: {
            type: String
        },
        seen: {
            type: Boolean,
            default: false,
        },
        img: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Message", messgeSchema)