import Axios from "./axios"
import usePostStore from '../zustand/posts/postsStore'; 

// see all posts 

   export const getPost = async () => {
        try {
            const response = await Axios.get(`/api/posts/`)
            if(response.status === 200){
                const postsStore = usePostStore();
                postsStore.getPosts(response.data);
                return response.data
            }
        } catch (error) {
            console.log("error in getPosts ",error.message)
        }
    }