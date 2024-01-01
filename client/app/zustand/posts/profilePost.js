import create from 'zustand'

const useProfile = create((set) => ({ 
    profile: false, 
    setProfile: () => set({ profile: true, selected: "profile" }),
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