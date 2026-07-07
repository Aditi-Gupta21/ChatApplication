import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    loading: false,
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    markMessagesAsSeen: (state, action) => {
      const { messageIds } = action.payload;

      state.messages.forEach((message) => {
        if (messageIds.includes(message._id)) {
          message.seen = true;
        }
      });
    },
    editMessage: (state, action) => {
      const updatedMessage = action.payload;

      const index = state.messages.findIndex(
        (msg) => msg._id === updatedMessage._id
      );

      if (index !== -1) {
        state.messages[index] = updatedMessage;
      }
    },
    deleteMessage: (state, action) => {
      const deleteMessage = action.payload;

      const index = state.messages.findIndex((msg) => msg._id === deleteMessage._id);

      if (index !== -1) {
        state.messages[index] = deleteMessage;
      }
    },
    removeMessage: (state, action) => {
      state.messages = state.messages.filter(
        (msg) => msg._id !== action.payload
      );
    },
  }
});


export const { setMessages, setLoading, markMessagesAsSeen, editMessage, deleteMessage,removeMessage } = messageSlice.actions;
export default messageSlice.reducer;
