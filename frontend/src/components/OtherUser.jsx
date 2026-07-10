import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import { resetUnreadCount } from "../redux/conversationSlice";

const OtherUser = ({ conversation }) => {
  const user = conversation.user;

  const dispatch = useDispatch();

  const { selectedUser, onlineUsers } = useSelector(
    (store) => store.user
  );

  const isOnline = onlineUsers?.includes(user._id);
  const isSelected = selectedUser?._id === user._id;
  const hasUnread = conversation.unreadCount > 0;

  const selectedUserHandler = async () => {
    if (selectedUser?._id === user._id) return;

    dispatch(setSelectedUser(user));
    dispatch(resetUnreadCount(user._id));


    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/conversation/${user._id}/read`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={selectedUserHandler}
      className={`
        group
        cursor-pointer
        rounded-3xl
        border
        p-4
        transition-all
        duration-300

        ${isSelected
          ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] shadow-md"
          : "border-transparent bg-white hover:border-[var(--color-border)] hover:shadow-md hover:-translate-y-[2px]"
        }
      `}
    >
      <div className="flex items-center gap-4">

        {/* Avatar */}

        <div className="relative shrink-0">

          <img
            src={user.profilePhoto}
            alt={user.fullName}
            className="
              h-16
              w-16
              rounded-full
              border-2
              border-white
              object-cover
              shadow-md
              transition-transform
              duration-300
              group-hover:scale-105
            "
          />

          {isOnline && (
            <span
              className="
                absolute
                bottom-1
                right-1
                h-4
                w-4
                rounded-full
                border-[3px]
                border-white
                bg-[var(--color-accent)]
                ring-2
                ring-[var(--color-accent-soft)]
              "
            />
          )}

        </div>

        {/* Details */}

        <div className="flex min-w-0 flex-1 flex-col">

          <div className="flex items-start justify-between">

            <div className="min-w-0">

              <h3
                className={`
                  truncate
                  text-[15px]
                  font-semibold

                  ${hasUnread
                    ? "text-[var(--color-ink)]"
                    : "text-slate-700"
                  }
                `}
              >
                {user.fullName}
              </h3>

              <p className="truncate text-xs text-slate-400">
                @{user.userName}
              </p>

            </div>

            {conversation.lastMessageTime && (
              <span
                className={`
                  ml-3
                  shrink-0
                  text-[11px]
                  font-medium

                  ${hasUnread
                    ? "text-[var(--color-accent)]"
                    : "text-slate-400"
                  }
                `}
              >
                {new Date(
                  conversation.lastMessageTime
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}

          </div>

          <div className="mt-3 flex items-center justify-between gap-3">

            <p
              className={`
                flex-1
                truncate
                text-[13px]
                leading-5

                ${hasUnread
                  ? "font-semibold text-[var(--color-ink)]"
                  : "text-slate-500"
                }
              `}
            >
              {conversation.lastMessage || "Start a conversation"}
            </p>

            {hasUnread && (
              <span
                className="
                  flex
                  h-6
                  min-w-6
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--color-accent)]
                  px-2
                  text-[11px]
                  font-bold
                  text-white
                  shadow-sm
                "
              >
                {conversation.unreadCount}
              </span>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default OtherUser;