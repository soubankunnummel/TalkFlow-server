import exprss from 'express'
import { createPost, deletePost, getFeedPosts, getPostbyId, getPosts, likePost, replaPost, sharePost, updatePost } from '../controllers/postController.js'
import protectRoute from '../middelwares/protectRoute.js'

const router = exprss.Router()
router.get("/feed",protectRoute, getFeedPosts)
router.get("/",getPosts)
router.get("/:id", getPostbyId)
router.post("/create",protectRoute, createPost)
router.put("/:id", protectRoute,updatePost)
router.delete("/:id",protectRoute,deletePost)
router.post("/like/:id",protectRoute,likePost)
router.post("/replay/:id",protectRoute,replaPost)
router.post("/share/:id", protectRoute,sharePost)

export default router