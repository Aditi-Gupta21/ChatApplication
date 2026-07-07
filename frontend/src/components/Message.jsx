import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { editMessage, deleteMessage, removeMessage } from "../redux/messageSlice";
import MessageMenu from "./chat/MessageMenu";
import DeleteMessageModal from "./chat/DeleteMessageModal";
import EditMessageInput from "./chat/EditMessageInput";
import { toast } from 'react-hot-toast'
import { updateConversation } from "../redux/conversationSlice";



const Message = ({ message }) => {
  const scroll = useRef();
  const menuRef = useRef(null);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(message.message);
  const [showMenu, setShowMenu] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);


  const { authUser, selectedUser } = useSelector(
    (store) => store.user
  );

  const isSender = authUser?._id === message.senderId;

  const canShowMenu =
    isSender && !message.deletedForEveryone;

  useEffect(() => {
    scroll.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [message]);

  useEffect(() => {
    setEditedText(message.message);
  }, [message.message]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  const handleKeyDown = (e) => {
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

  const scrollToMessage = () => {
    setTimeout(() => {
      scroll.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 0);
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
        `http://localhost:9000/api/v1/message/edit/${message._id}`,
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
        `http://localhost:9000/api/v1/message/delete/${message._id}`,
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
          edited:true,
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
        `http://localhost:9000/api/v1/message/deleteforme/${message._id}`,
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

  return (
    <div ref={scroll}>
      <div className={`chat ${isSender ? "chat-end" : "chat-start"}`}>

        {/* Avatar */}
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              src={
                isSender
                  ? authUser?.profilePhoto
                  : selectedUser?.profilePhoto
              }
              alt="avatar"
            />
          </div>
        </div>

        {/* Header */}
        <div className="chat-header flex items-center gap-2">

          <time className="text-xs opacity-60">
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </time>

          {isSender && (
            <span className="text-xs">
              {message.seen ? "✓✓" : "✓"}
            </span>
          )}

          <MessageMenu
            canShowMenu={canShowMenu}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            menuRef={menuRef}
            onEdit={() => {
              setEditedText(message.message);
              setIsEditing(true);
              setShowMenu(false);
              scrollToMessage();
            }}

            onDelete={() => {
              setShowDeleteModal(true);
              setShowMenu(false);
              scrollToMessage();
            }}
          />

        </div>

        {/* Message Bubble */}
        <div
          className={`chat-bubble ${isSender
            ? "bg-black text-white"
            : "bg-white text-black"
            }`}
        >
          {isEditing ? (
            <EditMessageInput
              editedText={editedText}
              setEditedText={setEditedText}
              handleSave={handleSave}
              isSaving={isSaving}
              originalMessage={message.message}
              handleKeyDown={handleKeyDown}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <>
              {message.deletedForEveryone ? (
                <p className="italic opacity-60">
                  🚫 This message was deleted
                </p>
              ) : (
                <>
                  <p>{message.message}</p>

                  {message.edited && (
                    <p className="mt-1 text-[10px] italic opacity-70">
                      edited
                    </p>
                  )}
                </>
              )}
            </>
          )}

        </div>

      </div>
      <DeleteMessageModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
        onDeleteForMe={handleDeleteForMe}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default Message;