import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);


  return (
    <div ref={scroll}>
      <div
        className={`chat ${authUser?._id === message?.senderId ? "chat-end" : "chat-start"
          }`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              src={
                authUser?._id === message.senderId
                  ? authUser?.profilePhoto
                  : selectedUser?.profilePhoto
              }
              alt="avatar"
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs text-white">12:45</time>
        </div>

        <div className="chat-bubble">
          {message?.message}
        </div>
      </div>
    </div>
  );
};

export default Message;