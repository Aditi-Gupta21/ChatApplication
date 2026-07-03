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
    },
    markMessagesAsSeen:(state,action) => {
      const {messageIds} = action.payload;

      state.messages.forEach((message)=>{
        if(messageIds.includes(message._id)){
          message.seen = true;
        }
      });
    },

  }
});


export const {setMessages, setLoading, markMessagesAsSeen} = messageSlice.actions;
export default messageSlice.reducer;
