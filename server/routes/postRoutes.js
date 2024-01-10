import exprss from 'express'
import {   deletePost, getFeedPosts, getNotification, getPostbyId, getPosts, getRepliedPosts, likePost, postCreate, replaPost, sharePost, updatePost } from '../controllers/postController.js'
import protectRoute from '../middelwares/protectRoute.js'
import imageUpload from '../middelwares/imageUpload.cjs'
import postImage from '../middelwares/postImage.cjs'

const router = exprss.Router()
router.get("/feed",protectRoute, getFeedPosts) 
router.get("/",getPosts) 
router.get("/:id", getPostbyId)
// router.post("/create", protectRoute, createPost)   
router.post('/create-post', protectRoute, postImage, postCreate )  
router.put("/:id", protectRoute,updatePost)
router.delete("/:id",protectRoute,deletePost)  
router.post("/like/:id",protectRoute,likePost)
router.post('/notification',protectRoute, getNotification)
router.post("/replay/:id",protectRoute,replaPost) 
router.post("/share/:id", protectRoute,sharePost)
router.post("/replies",protectRoute,getRepliedPosts)

export default router