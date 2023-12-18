import  express  from "express";
import dotenv from 'dotenv'
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import {v2 as cloudinary} from 'cloudinary';

dotenv.config()

connectDB() 
const app = express()

const PORT = process.env.PORT || 5000

 cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API,
    api_secret:process.env.CLOUDINARY_SECRET_KEY
 })

// meddelwares

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

//Routes

app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

app.listen(PORT, () => console.log(`server running on port ${PORT}`))  