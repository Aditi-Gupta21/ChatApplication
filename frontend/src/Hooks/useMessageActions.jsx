import axios from "axios";
import { toast } from "react-hot-toast";

const useMessageActions = ({
  message,
  selectedUser,
  selectedUsers,

  editedText,
  setEditedText,

  setIsEditing,
  setShowMenu,

  setShowDeleteModal,

  setShowForwardModal,
  setSelectedUsers,

  setIsSaving,
  setIsDeleting,
  setIsForwarding,

  dispatch,

  editMessage,
  deleteMessage,
  removeMessage,
  updateConversation,

  scroll,
}) => {

  const scrollToMessage = () => {
    setTimeout(() => {
      scroll.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 0);
  };

  const handleKeyDown = (e, handleSave) => {
    if (e.key === "Escape") {
      setEditedText(message.message);
      setIsEditing(false);
      return;
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  };

  const handleSave = async () => {
    if (!editedText.trim()) {
      setEditedText(message.message);
      setIsEditing(false);
      return;
    }

    if (editedText.trim() === message.message) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/message/edit/${message._id}`,
        {
          message: editedText,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(editMessage(res.data.updatedMessage));

      dispatch(
        updateConversation({
          receiverId: selectedUser._id,
          message: res.data.updatedMessage.message,
        })
      );

      setIsEditing(false);
      setShowMenu(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to edit message"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/message/delete/${message._id}`,
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(deleteMessage(res.data.deletedMessage));

      dispatch(
        updateConversation({
          receiverId: selectedUser._id,
          message: "🚫 This message was deleted",
          edited: true,
        })
      );

      setShowMenu(false);
      setShowDeleteModal(false);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to delete message"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteForMe = async () => {
    setIsDeleting(true);

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/message/deleteforme/${message._id}`,
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(removeMessage(res.data.messageId));

      setShowDeleteModal(false);
      setShowMenu(false);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to delete message"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleForward = async () => {
    if (selectedUsers.length === 0) return;

    setIsForwarding(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/message/forward`,
        {
          receiverIds: selectedUsers,
          message: message.message,
        },
        {
          withCredentials: true,
        }
      );

      selectedUsers.forEach((id) => {
        dispatch(
          updateConversation({
            receiverId: id,
            message: message.message,
            createdAt: new Date().toISOString(),
          })
        );
      });

      toast.success("Message forwarded");

      setShowForwardModal(false);
      setSelectedUsers([]);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to forward message"
      );
    } finally {
      setIsForwarding(false);
    }
  };

  return {
    scrollToMessage,
    handleKeyDown,
    handleSave,
    handleDelete,
    handleDeleteForMe,
    handleForward
  };
};


export default useMessageActions;