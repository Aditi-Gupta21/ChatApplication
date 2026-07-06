import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { editMessage } from "../redux/messageSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
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

  const { authUser, selectedUser } = useSelector(
    (store) => store.user
  );

  const isSender = authUser?._id === message.senderId;

  const canEdit =
    isSender &&
    Date.now() - new Date(message.createdAt).getTime() <=
    5 * 60 * 1000;

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
          edited: true,
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

          {canEdit && (
            <div ref={menuRef} className="relative">

              <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="p-1 rounded hover:bg-zinc-700 transition-colors"
              >
                <BsThreeDotsVertical className="text-sm" />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-36 rounded-md bg-zinc-800 shadow-lg z-50">

                  <button
                    onClick={() => {
                      setEditedText(message.message);
                      setIsEditing(true);
                      setShowMenu(false);

                      setTimeout(() => {
                        scroll.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }, 0);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-zinc-700"
                  >
                    <MdEdit />
                    Edit
                  </button>

                </div>
              )}

            </div>
          )}

        </div>

        {/* Message Bubble */}
        <div
          className={`chat-bubble ${isSender
            ? "bg-black text-white"
            : "bg-white text-black"
            }`}
        >
          {isEditing ? (
            <div className="flex flex-col gap-2 min-w-[250px]">

              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                disabled={isSaving}
                rows={2}
                className="w-full bg-transparent outline-none border border-gray-500 rounded-lg px-3 py-2 text-inherit resize-none"
              />

              <div className="flex justify-end gap-2">

                <button
                  onClick={() => {
                    setEditedText(message.message);
                    setIsEditing(false);
                  }}
                  disabled={isSaving}
                  className="px-3 py-1 rounded-md text-xs bg-zinc-700 hover:bg-zinc-600 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-3 py-1 rounded-md text-xs bg-green-600 hover:bg-green-500 transition"
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>

              </div>

            </div>
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
        </div>

      </div>
    </div>
  );
};

export default Message;