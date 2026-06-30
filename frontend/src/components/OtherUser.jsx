import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({ conversation }) => {
  const user = conversation.user;
  const dispatch = useDispatch();

  const { selectedUser, onlineUsers } = useSelector(
    (store) => store.user
  );

  const isOnline = onlineUsers?.includes(user._id);

  const selectedUserHandler = () => {
    dispatch(setSelectedUser(user));
  };

  return (
    <>
      <div
        onClick={selectedUserHandler}
        className={`${selectedUser?._id === user._id ? "bg-zinc-700" : ""
          } flex gap-2 items-center hover:bg-zinc-700 rounded-sm p-2 cursor-pointer transition-all duration-200`}
      >
        <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={user.profilePhoto} alt="user profile" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-white">
              {user.fullName}
            </p>

            <span className="text-xs text-gray-300">
              {conversation.lastMessageTime
                ? new Date(
                  conversation.lastMessageTime
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
                : ""}
            </span>
          </div>

          <p className="text-sm text-gray-300 truncate">
            {conversation.lastMessage || "Start a conversation..."}
          </p>
        </div>


      </div>

      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
};

export default OtherUser;