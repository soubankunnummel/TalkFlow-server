import create from 'zustand'

const usePosts = create ((set) => ({
    post: [],
    user:'',
    
    setPost: (postData) => set({ post: postData }),
    serUser: (postUser) => set({ user: postUser}),

    repliPost:false,
    setRepliPost: () => set({repliPost: true, selected:"repliPost"}),
    setOutRepliPost: () => set({repliPost: false, selected:null}),

    repost:false,
    setRepost: () => set({ repost: true, selected: 'repost'}),
    setOutRepost: () => set({ repost: false, selected: null}),
    selected: null



}))

export default usePosts  