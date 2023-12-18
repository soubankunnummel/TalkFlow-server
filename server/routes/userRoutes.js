import express from 'express'
import { allUsers, folloUnfollowUser, getUserProfile, loginUser, logoutUser, signupUser, updateUser } from '../controllers/userController.js';
import trycatch from '../middelwares/trycatch.js'
import protectRoute from '../middelwares/protectRoute.js';

const router = express.Router()

router.get("/profile/:username",getUserProfile )
router.get("/users",allUsers)
router.post("/signup",trycatch,signupUser )
router.post("/login",loginUser )
router.post("/logout",logoutUser )
router.post("/follow/:id",protectRoute,folloUnfollowUser )
router.put("/update/:id",protectRoute,updateUser )

export default router   