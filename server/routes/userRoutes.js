import express from 'express'
import { allUsers, folloUnfollowUser, getUserProfile, googleLogin, loginUser, logoutUser, signupUser, success, updateUser } from '../controllers/userController.js';
// import trycatch from '../middelwares/trycatch.js'
import protectRoute from '../middelwares/protectRoute.js';
import imageUpload from '../middelwares/imageUpload.cjs';
import passport from 'passport';

const router = express.Router()

router.get("/profile/:username",getUserProfile )
router.get("/users",allUsers)
router.post("/signup",signupUser )
router.post("/login",loginUser )
router.get('/success',success)
router.post('/login/google', passport.authenticate('google', {scope: ["profile", "email"]}), googleLogin);
router.post("/google/callback", passport.authenticate("google", {failureRedirect:"/failed"}), (req, res) =>  {res.redirect("/success")}  )
router.post("/logout",logoutUser )
router.post("/follow/:id",protectRoute,folloUnfollowUser )
router.put("/update/:id", imageUpload("profilePic"), protectRoute, updateUser);

export default router    