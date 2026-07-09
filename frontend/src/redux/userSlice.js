import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    selectedUser: null,
    otherUsers: [],
    onlineUsers: [],
    isTyping:false
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },

    updateAuthUser: (state, action) => {
      state.authUser = {
        ...state.authUser,
        ...action.payload,
      };
    },

    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },

    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },

    setOnlineUser: (state, action) => {
      state.onlineUsers = action.payload;
    },

    setIsTyping:(state, action)=>{
      state.isTyping = action.payload;
    },
  },
});

export const {
  setAuthUser,
  updateAuthUser,
  setSelectedUser,
  setOtherUsers,
  setOnlineUser,
  setIsTyping
} = userSlice.actions;

export default userSlice.reducer;