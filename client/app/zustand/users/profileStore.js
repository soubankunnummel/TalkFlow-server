import create from 'zustand'

const useProfileStore = create ((set) => ({

    promoimg:null,
    setPromoImg: (profileData) => ({profile:profileData}),

    profile:{},
    setProfile: (profileData) =>  set({profile:profileData}),

    username: "",
    setUserName: (profileData) => set({username:profileData}),

    name:"",
    setName: (profileData) => set({name:profileData}),

    email:"",
    setEmail: (profileData) => set({email:profileData}),

    bio:"",
    setBio: (profileData) => set({bio:profileData}),

    profilePic:null,
    setProfilePic: (profileData) => set({profilePic:profileData})


}))
export default useProfileStore