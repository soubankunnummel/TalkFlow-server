
import Axios from "./axios"


/// get user Profle

    export const getProfielPost = async (username) => {
        try {
            const response = await Axios.get(`/api/users/profile/${username}`)
            
            if(response.status === 200){
              
                return response.data.posts
            }
        } catch (error) {
            console.log("Error in getProfile", error)
        }
    }

// get post user


    
    export const getPostuser = async (username) => {
        try {
            const response = await Axios.get(`/api/users/profile/${username}`)
            if(response.status === 200){
                return response.data.user
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

// all users 

    export const getAllUsers = async () => {
        try {
            const response = await Axios(`api/users/users`)
            if(response.status === 200){
                return response.data.Users
            }
        } catch (error) {
            console.log("Error in get all users")
        }
    }

// follo nufollow 

    export const folloUnfollowUser = async (id) => {
        try {
            const response = await Axios.post(`/api/users/follow/${id}`)
            if(response.status === 200){
                return response.data
            }
        } catch (error) {
            console.log("Error in follow unfollo user")
            
        }
    }

// followers only

    export const followers = async () => {
        try {
            const response = await Axios.get(`/api/users/followers`)
            if(response.status === 200){
                return response.data.followers
            }
        } catch (error) {
            console.log("Error in followers",error)
        }
    }

// get user profile 

    export const getProfile = async (username) => {
        try {
            const response = await Axios.get(`/api/users/user-profile/${username}`)
            console.log('respons:' ,response.data)
            if(response.status === 200) {

                return response.data
                // const following = response.data.following
                // const user = response.data.user
                // return {user:user,following:following}
            }
        } catch (error) {
            console.log("Error in get User Profile ", error)
        }
    }

// Edit profile

    export const editProfile = async (id, fomData) => {
        console.log("id from modal",id)
        try {
            const respons = await Axios.put(`/api/users/update/${id}`,fomData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                  },
            })
            console.log("added :",respons)
            if(respons.status === 200){
                return respons.data
            }
        } catch (error) {
            console.log("Error in Edit Profile", error)
        }
    }