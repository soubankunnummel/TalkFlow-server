import Post  from "../models/postModel.js"
import User from "../models/userModel.js"


// Create a post 

const createPost = async (req, res) => {
    try {
        const { postedBy, text, img } = req.body;

        if (!postedBy || !text) {
            return res.status(400).json({ message: "PostedBy and text field are required" });
        }

        const user = await User.findById(postedBy);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Unauthorized to create post" });
        }

        const maxLength = 500;

        if (text.length > maxLength) {
            return res.status(400).json({ message: `Text must be less than ${maxLength} characters` });
        }

        const newPost = new Post({ postedBy, text, img });
        await newPost.save();

        res.status(201).json({ message: "New post created", newPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in createPost: ", error.message);
    }
};


// Get all posts

    const getPosts = async (req,res) => {
        try {
            const post = await Post.find()
            if(!post) return res.status(400).json({message:"No Post yet"})
            res.status(200).json(post)
        } catch (error) {
            res.status(500).json({ message: error.message });
            console.log("Error in Get Posts", error.message)
            
        }
    }
// Get Post by Id

    const getPostbyId = async (req, res) => {
        try {
            
            const post = await Post.findById(req.params.id)
            if(!post) return res.status(404).json({message:"Post not fount"})

            res.status(200).json(post)
        } catch (error) {
            res.status(500).json({ message: error.message });
            console.log("Error in getpost ById",error.message)
        }
    }

// Update a post 
    
    const updatePost = async (req, res) => {
        try {
            const {text, img} = req.body
            const PostId = req.params.id
            const updatedPost = await Post.findByIdAndUpdate(PostId, {text,img}, {new :true})
            if(!updatedPost) return res.status(404).json({message:"Post not fount"})

            // const updatedPost = await Post.updateMany({text:text, img:img})
            res.status(200).json({message:"Post updated",updatedPost})

        } catch (error) {
            res.status(500).json({ message: error.message });
            console.log("Error in Update Post",error.message)
        }
    }

// Delete a  post 

    const deletePost = async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            if(!post) return res.status(404).json({message:"Post not fount"})
            
            if(post.postedBy.toString() !== req.user._id.toString()){
                return res.status(401).json({ error: "Unauthorized to delete post" });
            }

            await Post.findByIdAndDelete(req.params.id);

            res.status(200).json({message:"Post deleted"})

        } catch (error) {
            res.status(500).json({ message: error.message });
            console.log("Error in Delete Post",error.message) 
        }
    }

// Like post 

    const likePost = async (req, res) => {    
        try {
            const {id:postId} = req.params

            const userId = req.user._id

            const post = await Post.findById(postId)
            if(!post) return res.status(404).json({message:"Post not found"})

            const userLikedPost = post.likes.includes(userId)

            if(userLikedPost){

                await Post.updateOne({_id:postId}, {$pull : {likes: userId}})
                res.status(200).json({message:"Post Unliked succesfully"})
            }else{

                post.likes.push(userId)
                await post.save()
                res.status(200).json({message:"Post Like succesfully"})
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
            console.log("Error in Like Post",error.message) 
        }
    }

// Replay to post

    const replaPost =  async (req, res) => {
        try {
            const {text} = req.body
            const PostId = req.params.id
            const userId = req.user._id
            const userProfilePic = req.user.profilePic
            const username = req.user.username

            console.log(userId, username,userProfilePic)

            if(!text) return res.status(400).json({message:"Text is requied"})

            const post = await Post.findById(PostId)
            if(!post) return res.status(404).json({message:"Post not fount"})

            const replay = {userId, text, userProfilePic, username}

            post.replies.push(replay)
            await post.save()

            res.status(200).json({message:"Replay added succesfulyy",replay})

        } catch (error) {
            res.status(500).json({ message: error.message });
            console.log("Error in Replay Post",error.message) 
        }
    }

// Get Feed post

    const getFeedPosts = async (req, res) => {
        
        try {
            
            const userId = req.user._id
            const user = await User.findById(userId)

            if(!user) return res.status(404).json({message:"user not found"})

            const following = user.following;
            console.log("folow",following)

        //    const feedPost = await Post.find({ postedBy: { $in: following } }).sort({ createdAt: -1 });
           const feedPost = await Post.find({ postedBy: { $in: following } }).sort({ createdAt: -1 });

            if(!feedPost) return res.status(404).json({message:"Post not fount"})

            res.status(200).json({feedPost:feedPost});

        } catch (error) {
            res.status(500).json({ message: error.message });
            console.log("Error in Feed Post",error.message) 
        }
    }
    export {createPost, getPosts, getPostbyId, updatePost, deletePost, likePost, replaPost, getFeedPosts}