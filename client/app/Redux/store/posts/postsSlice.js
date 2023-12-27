
"use client";

const { createSlice } = require("@reduxjs/toolkit");


  const postSlice = createSlice({
    name:'posts',
    initialState:[],
    reducers:{ 
        setPost : (state, action) => {
          // state = action.payload
          return action.payload
        }
    }

 })

 export const {setPost}  = postSlice.actions

 export default postSlice.reducer