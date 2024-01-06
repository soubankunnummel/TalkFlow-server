

import create  from 'zustand'

const usePostsStroe = create ((set) => ({

    postedBy: null,

    text    : "",
    image     : null,
    username: "",
    setUserName: (userData) => set({username: userData}),

    profilePic:null,
    setProfilePic: (userData) => set({profilePic: userData}),

    userId:"",
    setUserId: (userData) => set({userId:userData}),

    setPostedBy: (userData) => set({postedBy:userData}),
    setText    : (userData) => set({text:userData}),
    setImage     : (userData) => set({image:userData}),

    resetState : () => set({
        postedBy: null,
        text    : null, 
        image     : null,
    })

}))

export default usePostsStroe