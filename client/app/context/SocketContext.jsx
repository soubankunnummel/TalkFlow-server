
"use client"
import { createContext, useContext, useEffect, useState,  } from "react";
import io from 'socket.io-client'
import { getUsr } from "../service/users";

const SocketContext = createContext()

export const useSocket = () => {
    return useContext(SocketContext)
}



export const SocketContextProvider = ({ children }) => {

    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [user, setUser] = useState(null)
    const fechUser = async () => {
        try {
            const response = await getUsr()
            console.log(response._id)
            setUser(response._id)
        } catch (error) {
            console.log("error in socket",error)
        }
    }

    useEffect(() => {
        fechUser()
       
        const socket = io("http://localhost:5000", {
            path: '/socket-io',
            query: {
                userId: user?._id,
              },
        })


        setSocket(socket)

        socket.on("newNotification",(notification) => {
            setNotifications((prevNotifications) => [notification, ...prevNotifications]);
        })

        return () => socket && socket.close();
    },[user])
return (

    <SocketContext.Provider value={{ socket, onlineUsers, notifications }}>
    {children}
    </SocketContext.Provider>
)


}

