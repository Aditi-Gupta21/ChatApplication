import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scroll = useRef();

  const { authUser, selectedUser } = useSelector(
    (store) => store.user
  );

  const isSender = authUser?._id === message?.senderId;

  useEffect(() => {
    scroll.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [message]);

  return (
    <div ref={scroll}>
      <div className={`chat ${isSender ? "chat-end" : "chat-start"}`}>
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

        <div className="chat-header flex items-center gap-1">
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
        </div>

        <div
          className={`chat-bubble ${isSender
              ? "bg-black text-white"
              : "bg-white text-black"
            }`}
        >
          {message?.message}
        </div>
      </div>
    </div>
  );
};

export default Message;