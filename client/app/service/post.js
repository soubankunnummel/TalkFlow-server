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