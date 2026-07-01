import { useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";

import { setIsTyping } from "../redux/userSlice";
import { setMessages } from "../redux/messageSlice";
import { updateConversation } from "../redux/conversationSlice";

const useSocketEvents = () => {
  const dispatch = useDispatch();
  const store = useStore();

  const { socket } = useSelector((store) => store.socket);
  const { selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    if (!socket) return;

    let typingTimer;

    // =========================
    // Typing
    // =========================
    const handleTyping = ({ senderId }) => {
      console.log("Typing event received");
      console.log("senderId:", senderId);
      console.log("selectedUser:", selectedUser?._id);

      if (selectedUser?._id !== senderId) {
        console.log("Ignoring typing event");
        return;
      }

      console.log("Showing typing indicator");

      dispatch(setIsTyping(true));

      clearTimeout(typingTimer);

      typingTimer = setTimeout(() => {
        dispatch(setIsTyping(false));
      }, 1000);
    };

    // =========================
    // Stop Typing
    // =========================
    const handleStopTyping = ({ senderId }) => {
      console.log("Stop typing:", senderId);

      if (selectedUser?._id !== senderId) return;

      clearTimeout(typingTimer);
      dispatch(setIsTyping(false));
    };

    // =========================
    // New Message
    // =========================
    const handleNewMessage = (newMessage) => {
      // Always update sidebar preview
      dispatch(
        updateConversation({
          receiverId: newMessage.senderId,
          message: newMessage.message,
          createdAt: newMessage.createdAt,
        })
      );

      // Update chat only if this conversation is currently open
      if (selectedUser?._id === newMessage.senderId) {
        const currentMessages = store.getState().message.messages;

        dispatch(setMessages([...currentMessages, newMessage]));
      }
    };

    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);
    socket.on("newMessage", handleNewMessage);

    return () => {
      clearTimeout(typingTimer);

      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, dispatch, selectedUser, store]);
};

export default useSocketEvents;