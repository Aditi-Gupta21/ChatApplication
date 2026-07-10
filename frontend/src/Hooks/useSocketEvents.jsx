import { useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import axios from "axios";

import { setIsTyping } from "../redux/userSlice";
import { setMessages, markMessagesAsSeen, editMessage, deleteMessage as deleteMessageAction, } from "../redux/messageSlice";
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

      if (selectedUser?._id !== senderId) {
        return;
      }

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

      if (selectedUser?._id !== senderId) return;

      clearTimeout(typingTimer);
      dispatch(setIsTyping(false));
    };

    // =========================
    // New Message
    // =========================
    const handleNewMessage = async (newMessage) => {
      // Always update sidebar preview
      dispatch(
        updateConversation({
          receiverId: newMessage.senderId,
          message: newMessage.message,
          createdAt: newMessage.createdAt,
          incrementUnread: selectedUser?._id !== newMessage.senderId,
        })
      );

      // Update chat only if this conversation is currently open
      if (selectedUser?._id === newMessage.senderId) {
        const currentMessages = store.getState().message.messages;

        dispatch(setMessages([...currentMessages, newMessage]));
        // To update read-receipts if chat window is open
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/conversation/${newMessage.senderId}/read`,
          {},
          {
            withCredentials: true,
          }
        );
      }
    };

    // =========================
    // Messages Seen
    // =========================
    const handleMessagesSeen = ({ messageIds }) => {
      
      dispatch(
        markMessagesAsSeen({
          messageIds,
        })
      );
    };

    // =========================
    // Edit Messages 
    // =========================
    const handleMessageEdited = ({ updatedMessage }) => {
      dispatch(editMessage(updatedMessage));
      dispatch(
        updateConversation({
          receiverId: updatedMessage.senderId,
          message: updatedMessage.message,
          edited: true,
        })
      );
    }

    // =========================
    // Delete Messages
    // =========================

    const handleMessageDeleted = ({ deletedMessage }) => {
      dispatch(deleteMessageAction(deletedMessage));

      dispatch(
        updateConversation({
          receiverId: deletedMessage.senderId,
          message: "🚫 This message was deleted",
          edited: true,
        })
      );
    };

    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);
    socket.on("newMessage", handleNewMessage);
    socket.on("messagesSeen", handleMessagesSeen);
    socket.on("messageEdited", handleMessageEdited);
    socket.on("messageDeleted", handleMessageDeleted);

    return () => {
      clearTimeout(typingTimer);

      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
      socket.off("newMessage", handleNewMessage);
      socket.off("messagesSeen", handleMessagesSeen);
      socket.off("messageEdited", handleMessageEdited);
      socket.off("messageDeleted", handleMessageDeleted);
    };
  }, [socket, dispatch, selectedUser, store]);
};

export default useSocketEvents;