import {Server} from 'socket.io'
import http from 'http'
import express from 'express'
import Notification from '../models/notificationModel'
import cors from 'cors'


const app = express ()
app.use(cors())
const server = http.createServer(app)
const io = new Server(server, {
    path: '/socket-io',
    cors: {
        origin:"http://localhost:3000",
        methods:["GET", "POST"]
    }
})

export const getRecipientSocketId = (recipientId) => {
    return userSocketMap[recipientId];
  };
  
  const userSocketMap = {};

  io.on("connection", (socket) => {
    console.log("user connectd", socket.id)

    const userId = socket.handshake.query.userId
    if(userId != "undefined") userSocketMap[userId] = socket.id
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("likePost", async({ postId, senderUserId, receiverUserId }) => {
        try {
            const notification = new Notification({
                senderUserId: senderUserId,
                receiverUserId: receiverUserId,
                postId: postId,
                message: `${senderUserId} liked your post`,
                type: "like",
              });

              await notification.save()

              io.to(userSocketMap[receiverUserId]).emit("newNotification", {
                notification,
              });
        } catch (error) {
            console.log(error)
        }
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected")
        delete userSocketMap[userId]
        io.emit("getOnlineUsers",  Object.keys(userSocketMap))
    })
  })

  export { io, server, app };