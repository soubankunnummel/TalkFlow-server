import create from 'zustand'

const usePosts = create ((set) => ({
    post: [], 
    user:'',

    postbyid:{},
    setPostById: (postData) => set({postbyid: postData}),

    profilePic:"",
    setProfilePic:(postData) => set({profilePic:postData}),
    
    replyText : "",
    setReplyText: (postdata) => set({replyText:postdata}),


    setPost: (postData) => set({ post: postData }),
    serUser: (postUser) => set({ user: postUser}),

    

    repliposts:[],
    setRepliposts: (postData) => set({repliposts: postData}),

    replies: [],
    setReplies: (postData) => set({replies: postData}),
    
    likes: false,
    setLikes: () => set((state) => ({ likes: !state.likes })),
    

    repliPost:false, 
    setRepliPost: () => set({repliPost: true, selected:"repliPost"}),
    setOutRepliPost: () => set({repliPost: false, selected:null}),

    repost:false,
    setRepost: () => set({ repost: true, selected: 'repost'}),
    setOutRepost: () => set({ repost: false, selected: null}),
    selected: null



}))

export default usePosts   