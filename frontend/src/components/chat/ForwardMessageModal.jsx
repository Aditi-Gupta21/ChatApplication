import React from "react";

const ForwardMessageModal = ({
  open,
  onClose,
  conversations,
  selectedUsers,
  setSelectedUsers,
  onForward,
  isForwarding,
  currentChatUserId,
}) => {
  if (!open) return null;

  const toggleUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100]">
      <div className="bg-zinc-900 rounded-xl w-96 max-h-[500px] overflow-hidden">

        <div className="p-4 border-b border-zinc-700">
          <h2 className="text-lg font-semibold">
            Forward Message
          </h2>
        </div>

        <div className="max-h-[300px] overflow-y-auto">
          {conversations
            .filter(
              (conversation) => conversation.user._id !== currentChatUserId
            )
            .map((conversation) => (
              <label
                key={conversation.user._id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(conversation.user._id)}
                  onChange={() => toggleUser(conversation.user._id)}
                />

                <img
                  src={conversation.user.profilePhoto}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />

                <span>{conversation.user.fullName}</span>
              </label>
            ))}

        </div>

        <div className="flex justify-end gap-3 p-4 border-t border-zinc-700">

          <button
            onClick={onClose}
            className="btn"
            disabled={isForwarding}
          >
            Cancel
          </button>

          <button
            onClick={onForward}
            disabled={
              selectedUsers.length === 0 || isForwarding
            }
            className="btn btn-primary"
          >
            {isForwarding ? "Forwarding..." : "Forward"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default ForwardMessageModal;