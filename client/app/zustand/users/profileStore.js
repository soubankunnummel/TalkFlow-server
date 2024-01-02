import create from 'zustand'

const useProfileStore = create ((set) => ({
    profile:{},
    setProfile: (profileData) =>  set({profile:profileData})
}))
export default useProfileStore