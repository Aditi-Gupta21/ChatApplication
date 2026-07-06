import { useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";

import { setIsTyping } from "../redux/userSlice";
import { setMessages, markMessagesAsSeen, editMessage } from "../redux/messageSlice";
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
    const handleNewMessage = (newMessage) => {
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

    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);
    socket.on("newMessage", handleNewMessage);
    socket.on("messagesSeen", handleMessagesSeen);
    socket.on("messageEdited", handleMessageEdited);

    return () => {
      clearTimeout(typingTimer);

      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
      socket.off("newMessage", handleNewMessage);
      socket.off("messagesSeen", handleMessagesSeen);
      socket.off("messageEdited", handleMessageEdited);
    };
  }, [socket, dispatch, selectedUser, store]);
};

export default useSocketEvents;