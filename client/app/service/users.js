

/// get user Profle
 
import Axios from "./axios"

    export const gerUserProfile = async (username) => {
        try {
            const response = await Axios.get(`/api/users/profile/${username}`)
            // console.log(response.data.userProfileWithPosts.posts)
            if(response.status === 200){
                return response.data.userProfileWithPosts.posts
            }
        } catch (error) {
            console.log("Error in getProfile", error)
        }
    }

// get logind user 

    export const getUsr = async () => {
        try {
            const response = await Axios.get('api/users/user')
            if(response.status === 200){

                return response.data

            }
        } catch (error) {
            console.log("Error in get user", error)
            
        }
    }