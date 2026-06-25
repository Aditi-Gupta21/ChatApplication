import React from "react";

const Message = () => {
  return (
    <div>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              src="https://randomuser.me/api/portraits/men/40.jpg"
              alt="avatar"
            />
          </div>
        </div>

        <div className="chat-header">
          <time className="text-xs text-white">12:45</time>
        </div>

        <div className="chat-bubble">
          You were the Chosen One!
        </div>
      </div>
    </div>
  );
};

export default Message;