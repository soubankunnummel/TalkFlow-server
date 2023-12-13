import exprss from 'express'
import { createPost, deletePost, getPostbyId, getPosts, likePost, updatePost } from '../controllers/postController.js'
import protectRoute from '../middelwares/protectRoute.js'

const router = exprss.Router()
router.get("/",getPosts)
router.get("/:id", getPostbyId)
router.post("/create",protectRoute, createPost)
router.put("/:id", protectRoute,updatePost)
router.delete("/:id",protectRoute,deletePost)
router.post("/like/:id",protectRoute,likePost)

export default router