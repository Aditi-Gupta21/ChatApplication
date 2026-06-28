import React from 'react'
import {createSlice} from '@reduxjs/toolkit'

const messageSlice = createSlice({
  name:"message",
  initialState:{
    messages:[],
    loading:false,
  },
  reducers:{
    setMessages:(state,action)=>{
      state.messages = action.payload;
    },
    setLoading:(state,action)=>{
      state.loading = action.payload;
    }
  }
});


export const {setMessages, setLoading} = messageSlice.actions;
export default messageSlice.reducer;
