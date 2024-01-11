 import create from 'zustand'

 const usersStore = create ((set) => ({
    user:[], 
    setUser: (userData) => set({user: userData}), 
   
    followerss:[],
    setFollowerss: (userData) => set({followerss: userData}),

    all: true,
    setAll: () => set({all: true , selected: "all"}) ,
 

    followers:false,
    setFollowers: () => set({followers: true, selected: "followers"}),
    setOutFollowers: () => set({followers: false, selected: null}),
    
    replies: false,
    setReplies: () => set({replies: true, selected: "replies"}),
    setOutReplies: () => set({replies: false, selected: null}),

    mention: false,
    setMentions: () => set({mention: true, selected: "mention"}),
    setOutMentions: () => set({mention: false, selected: null}),
    
    quats: false,
    setQuats: () => set({quats: true, selected: "quats"}),
    setOutQuats: () => set({quats: false, selected: null}),

    repots: false,
    setRepots: () => set({repots: true, selected: "repots"}),
    setOutRepots: () => set({repots: false, selected: null}),
    selected: null

 }))

 export default usersStore