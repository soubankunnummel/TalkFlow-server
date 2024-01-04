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

export const createPost = async (fomData) => {
    try {
        let headers = {};  // Initialize headers object

        // Check if fomData has the 'img' field
        console.log(fomData.has('img'))
        if (fomData.has('img')) {
            return headers = {
                'Content-Type': 'multipart/form-data',
            };
        } else {
             headers = {
                'Content-Type': 'application/json',
            };
        }

        const response = await Axios.post(`/api/posts/create`, fomData, { headers });

        console.log("response of image upload", response);

        if (response.status === 201) {
            return response.data;
        }
    } catch (error) {
        console.log("Error in create Post", error);
    }
};





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

//delete post 

    export const postDelet = async (id) => {
        try {
            const response = await Axios.delete(`/api/posts/${id}`)
            if(response){
                return response.data
            }
        } catch (error) {
            console.log("error in delet product")
        }
    }


