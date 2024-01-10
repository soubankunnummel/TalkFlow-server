import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  senderUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  reciveUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  message: {
    type: String,
    required:true
  },
  createdAt:{
    type:Date,
    default: Date.now
  }
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification