import React from "react";
import MessageMenu from "./MessageMenu";

const MessageHeader = ({
  message,
  isSender,
  canShowMenu,
  showMenu,
  setShowMenu,
  menuRef,
  onForward,
  onEdit,
  onDelete,
}) => {
  return (
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
        onForward={onForward}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};

export default MessageHeader;