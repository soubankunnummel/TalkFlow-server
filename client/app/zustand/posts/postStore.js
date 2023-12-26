import create from 'zustand';

const usePostStore = create((set) => ({
    post: [],
    getPosts: (post) => set((state) => ({posts: [...state.posts, post]}))
}))

export default usePostStore;