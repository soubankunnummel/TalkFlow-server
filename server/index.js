import dotenv from 'dotenv'
dotenv.config()
import  express  from "express";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import cors from 'cors'
// import passport from './config/passportConfig.js'
// import sessionConfig from './config/sessionConfig.js'



connectDB() 
const app = express()

const PORT = process.env.PORT || 5000


// app.use(sessionConfig);
// app.use(passport.initialize());
// app.use(passport.session());

// meddelwares

app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Routes

app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes) 

app.listen(PORT, () => console.log(`server running on port ${PORT}`))  