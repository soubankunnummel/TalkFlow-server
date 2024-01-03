

import create  from 'zustand'

const usePostsStroe = create ((set) => ({

    postedBy: null,
    text    : "",
    image     : null,
    username: "",
    setUserName: (userData) => set({username: userData}),

    userId:"",
    setUserId: (userData) => set({userId:userData}),

    setPostedBy: (postedBy) => set({postedBy}),
    setText    : (text) => set({text}),
    setImage     : (image) => set({image}),

    resetState : () => set({
        postedBy: null,
        text    : null, 
        image     : null,
    })

}))

export default usePostsStroe