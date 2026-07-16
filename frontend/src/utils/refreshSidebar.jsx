import axios from "axios";
import { setConversations } from "../redux/conversationSlice";

export const refreshSidebar = async (dispatch) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/conversation/sidebar`,
      {
        withCredentials: true,
      }
    );

    dispatch(setConversations(res.data.conversations));
  } catch (error) {
    console.error("Failed to refresh sidebar:", error);
  }
};