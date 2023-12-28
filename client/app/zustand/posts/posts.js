import create from 'zustand'

const usePosts = create ((set) => ({
    post: [],
    setPost: (postData) => set({ post: postData }),
}))

export default usePosts 