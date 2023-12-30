import create from 'zustand';

const useFolloPost = create((set) => ({
   // foryou:false,
   // following: true,/
   feed:false,
   openHome:true,
   setFeed: () => set({ feed: false }),
   setOutfeed: () => set({ feed: true }),

   showModal:false,
   setShowModal: () => set({showModal:true}),
   setOutShowModal: () => set({showModal:false})
}))

export default useFolloPost;