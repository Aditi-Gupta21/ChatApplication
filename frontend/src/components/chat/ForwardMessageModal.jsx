import { useState } from "react";
import { FiCheck, FiSearch } from "react-icons/fi";

const ForwardMessageModal = ({
  open,
  onClose,
  users,
  selectedUsers,
  setSelectedUsers,
  onForward,
  isForwarding,
  currentChatUserId,
}) => {
  const [search, setSearch] = useState("");
  
  const filteredUsers = users
  .filter((user) => user._id !== currentChatUserId)
  .filter((user) =>
    user.fullName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (!open) return null;

  const toggleUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };
  

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Header */}
        <div className="border-b border-[var(--color-border)] px-6 py-5">
          <h2 className="text-xl font-semibold text-[var(--color-ink)]">
            Forward Message
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Select one or more users
          </p>

          {/* Search */}
          <div className="relative mt-4">
            <FiSearch
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                rounded-full
                border
                border-[var(--color-border)]
                bg-slate-50
                py-2.5
                pl-11
                pr-4
                text-sm
                outline-none
                transition
                focus:border-[var(--color-accent)]
                focus:bg-white
                focus:ring-4
                focus:ring-[var(--color-accent-soft)]
              "
            />
          </div>
        </div>

        {/* User List */}
        <div className="max-h-80 overflow-y-auto px-3 py-3">

          {filteredUsers.length === 0 ? (
            <div className="py-10 text-center text-slate-500">
              No users found
            </div>
          ) : (
            filteredUsers.map((user) => {
              const selected = selectedUsers.includes(user._id);

              return (
                <div
                  key={user._id}
                  onClick={() => toggleUser(user._id)}
                  className={`
                    mb-2
                    flex
                    cursor-pointer
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    p-3
                    transition-all
                    duration-200

                    ${
                      selected
                        ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]"
                        : "border-transparent hover:bg-slate-50"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">

                    <img
                      src={user.profilePhoto}
                      alt={user.fullName}
                      className="h-12 w-12 rounded-full object-cover"
                    />

                    <div>
                      <h3 className="font-medium text-[var(--color-ink)]">
                        {user.fullName}
                      </h3>

                      <p className="text-xs text-slate-500">
                        @{user.userName}
                      </p>
                    </div>

                  </div>

                  <div
                    className={`
                      flex
                      h-6
                      w-6
                      items-center
                      justify-center
                      rounded-full
                      border
                      transition-all

                      ${
                        selected
                          ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                          : "border-slate-300"
                      }
                    `}
                  >
                    {selected && <FiCheck size={14} />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-[var(--color-border)] px-6 py-4">

          <button
            onClick={onClose}
            disabled={isForwarding}
            className="
              rounded-xl
              border
              border-[var(--color-border)]
              px-5
              py-2.5
              font-medium
              text-slate-600
              transition
              hover:bg-slate-50
            "
          >
            Cancel
          </button>

          <button
            onClick={onForward}
            disabled={
              selectedUsers.length === 0 || isForwarding
            }
            className="
              rounded-xl
              bg-[var(--color-accent)]
              px-5
              py-2.5
              font-medium
              text-white
              transition
              hover:brightness-110
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {isForwarding
              ? "Forwarding..."
              : `Forward ${
                  selectedUsers.length
                    ? `(${selectedUsers.length})`
                    : ""
                }`}
          </button>

        </div>

      </div>
    </div>
  );
};

export default ForwardMessageModal;