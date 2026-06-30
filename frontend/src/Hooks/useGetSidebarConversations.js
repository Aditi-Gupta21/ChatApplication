import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { setConversations, setConversationLoading, } from "../redux/conversationSlice";

const useGetSidebarConversations = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSidebarConversations = async () => {
      try {
        dispatch(setConversationLoading(true));

        const res = await axios.get(
          "http://localhost:9000/api/v1/conversation/sidebar",
          {
            withCredentials: true,
          }
        );

        dispatch(
          setConversations(res.data.conversations)
        );
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setConversationLoading(false));
      }
    };

    fetchSidebarConversations();
  }, [dispatch]);
};

export default useGetSidebarConversations;