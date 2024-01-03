import Axios from "./axios"

// see all posts 

export const getPost = async () => {
        try { 
            const response = await Axios.get(`/api/posts/`)
            if(response.status === 200){
                
                return response.data 
            }
        } catch (error) {
            console.log("error in getPosts ",error.message)
        }
    }

// get feed post

    export const getFeed = async () => {
        try {
            const response = await Axios.get( `/api/posts/feed`,)
            if(response.status === 200){
                return response.data.feedPost
            }
        } catch (error) {
            console.log("Error in get Feed",getFeed)
        }
    }

/// Post by ID 

export const gePostbyId = async () => {
    try {
        const response = await Axios.get(`/api/posts/${id}`)
        if(response.status === 200){
            return response.data
        }
    } catch (error) {
        console.log("Error in get PostBy id",error.message)
        
    }
} 

/// create post 

    export const createPost = async ({postedBy,text,img}) => {

        try {
            const response = await Axios.post(`/api/posts/create`,{postedBy,text,img})
            if(response.status === 201){
                return response.data
            }
        } catch (error) {
            console.log("Error in create Post")
        }
    }

// get replied posts  with reply

    export const getRepliedPosts = async () => {
        try {
            const response = await Axios.post(`/api/posts/replies`)
            console.log(response.data)
            if(response.status === 200){
                
                return response.data.repliedPosts 
            }
        } catch (error) {
            console.log("Error in replide post", error)
        }
    }


/// like and unlike 

    export const likePost = async (postId) => {
        try {
            const response = await Axios.post(`/api/posts/like/${postId}`)
            if(response.status === 200){
                return response.data
            }
        } catch (error) {
            console.log("error in like post",error)
        }
    }


