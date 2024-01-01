

import create  from 'zustand'

const usePostsStroe = create ((set) => ({

    postedBy: null,
    text    : null,
    img     : null,

    setPostedBy: (postedBy) => set({postedBy}),
    setText    : (text) => set({text}),
    setImg     : (img) => set({img}),

    resetState : () => set({
        postedBy: null,
        text    : null, 
        img     : null,
    })

}))

export default usePostsStroe