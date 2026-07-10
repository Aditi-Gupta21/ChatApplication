import { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import { FiArrowLeft } from "react-icons/fi";

const MessageContainer = () => {
  const {
    selectedUser,
    authUser,
    isTyping,
    onlineUsers,
  } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(setSelectedUser(null));
  }, [dispatch]);

  const isOnline = selectedUser
    ? onlineUsers?.includes(selectedUser._id)
    : false;

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-[#f8fafc]">
      {selectedUser ? (
        <>
          {/* ================= Header ================= */}

          <div
            className="
              sticky
              top-0
              z-20
              flex
              items-center
              justify-between
              border-b
              border-slate-200
              bg-white/95
              px-6
              py-4
              backdrop-blur-md
            "
          >
            <div className="flex items-center gap-3">

              {/* Mobile Back Button */}
              <button
                onClick={() => dispatch(setSelectedUser(null))}
                className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    text-slate-600
                    transition-all
                    duration-200
                    hover:bg-[var(--color-accent-soft)]
                    hover:text-[var(--color-accent)]
                    hover:shadow-sm
                  ">
                <FiArrowLeft size={22} />
              </button>

              {/* Avatar */}
              <div className="relative">

                <img
                  src={selectedUser.profilePhoto}
                  alt={selectedUser.fullName}
                  className="
                    h-12
                    w-12
                    rounded-full
                    border
                    border-slate-200
                    object-cover
                    shadow-sm
                  "
                />

                {/* Show only if online */}
                {isOnline && (
                  <span
                    className="
                      absolute
                      bottom-0
                      right-0
                      h-3.5
                      w-3.5
                      rounded-full
                      border-2
                      border-white
                      bg-[var(--color-accent)]
                    "
                  />
                )}

              </div>

              <div>

                <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                  {selectedUser.fullName}
                </h2>

                {isTyping ? (
                  <p className="animate-pulse text-sm font-medium text-[var(--color-accent)]">
                    typing...
                  </p>
                ) : (
                  <p
                    className={`text-sm ${isOnline
                        ? "text-[var(--color-accent)] font-medium"
                        : "text-slate-500"
                      }`}
                  >
                    {isOnline ? "Online" : `@${selectedUser.userName}`}
                  </p>
                )}

              </div>

            </div>
          </div>

          {/* ================= Messages ================= */}

          <div className="flex-1 overflow-y-auto px-6 py-5">
            <Messages />
          </div>

          {/* ================= Input ================= */}

          <SendInput />

        </>
      ) : (
        <div className="flex flex-1 items-center justify-center bg-[#f8fafc] px-8">
          <div className="max-w-md text-center">

            <div className="mb-6 text-7xl">💬</div>

            <h1 className="text-3xl font-bold text-[var(--color-ink)]">
              Welcome, {authUser?.fullName}
            </h1>

            <p className="mt-4 leading-7 text-slate-500">
              Select a conversation from the sidebar and start chatting with
              your friends in real time.
            </p>

          </div>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;