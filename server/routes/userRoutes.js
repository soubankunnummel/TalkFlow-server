import express from "express";
import {
  allUsers,
  fogotPassword,
  folloUnfollowUser,
  getUser,
  getUserProfile,
  googleLogin,
  loginUser,
  logoutUser,
  resetPassword,
  signupUser,
  updateUser,
  validateOTP,
} from "../controllers/userController.js";
// import trycatch from '../middelwares/trycatch.js'
import protectRoute from "../middelwares/protectRoute.js";
import imageUpload from "../middelwares/imageUpload.cjs";

const router = express.Router();

router.get("/profile/:username", getUserProfile);
router.get("/users", allUsers);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/login/google", googleLogin);
router.post("/forgot-password", fogotPassword);
router.post("/verify-otp",validateOTP)
router.post("/reset-password", resetPassword); 


router.get('/user',protectRoute, getUser)
router.post("/logout", protectRoute, logoutUser);
router.post("/follow/:id", protectRoute, folloUnfollowUser);
router.put("/update/:id", imageUpload("profilePic"), protectRoute, updateUser);

export default router;
