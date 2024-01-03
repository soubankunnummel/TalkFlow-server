import create from 'zustand'

const useProfile = create((set) => ({ 
    profile: false, 
    setProfil: () => set({ profile: true, selected: "profile" }),


    userprofile: false, 
    setUserProfil: () => set({ userprofile: true, selected: "userprofile" }),


    setOutProfile: () => set({ profile: false, selected: null }),
    search: false,
    setSearch: () => set({ search: true, selected: "search" }), 
    setOutSearch: () => set({ search: false, selected: null }),
    likes: false,
    setLikes: () => set({ likes: true, selected: "likes" }),
    setOutLikes: () => set({ likes: false, selected: null }),
    selected: null,


}))

export default useProfile 