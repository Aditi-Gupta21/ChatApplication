import {createSlice} from '@reduxjs/toolkit'

const conversationSlice = createSlice({
  name:"conversation",
  initialState:{
    conversations:[],
    loading:false,
  },

  reducers:{
    setConversations:(state,action)=>{
      state.conversations = action.payload;
    },

    setConversationLoading : (state,action)=>{
      state.loading = action.payload;
    },
  }
});


export const {setConversations, setConversationLoading} = conversationSlice.actions;
export default conversationSlice.reducer;