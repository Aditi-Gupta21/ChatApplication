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

    updateConversation:(state, action)=>{
      const {receiverId, message, createdAt} = action.payload;
      
      const index = state.conversations.findIndex((conversation) => conversation.user._id === receiverId);


      if(index !== -1){
        const conversation = state.conversations[index];

        conversation.lastMessage = message;
        conversation.lastMessageTime = createdAt;

        // Move updated conversation to the top
        state.conversations.splice(index,1);
        state.conversations.unshift(conversation);
      }
    },
    
  }
});


export const {setConversations, setConversationLoading, updateConversation} = conversationSlice.actions;
export default conversationSlice.reducer;