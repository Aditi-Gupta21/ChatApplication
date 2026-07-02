import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import { resetUnreadCount } from '../redux/conversationSlice'

const OtherUser = ({ conversation }) => {
  const user = conversation.user;
  const dispatch = useDispatch();

  const { selectedUser, onlineUsers } = useSelector(
    (store) => store.user
  );

  const isOnline = onlineUsers?.includes(user._id);

  const selectedUserHandler = async () => {

    if (selectedUser?._id === user._id) return;

    try {
      dispatch(setSelectedUser(user));

      if (conversation.unreadCount > 0) {
        dispatch(resetUnreadCount(user._id));

        try {
          await axios.patch(
            `http://localhost:9000/api/v1/conversation/${user._id}/read`,
            {},
            {
              withCredentials: true,
            }
          );
        } catch (error) {
          console.log(error);
        }
      }

    } catch (error) {
      console.log(error);
    }
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

          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-300 truncate">
              {conversation.lastMessage || "Start a conversation..."}
            </p>

            {conversation.unreadCount > 0 && (
              <div className="ml-2 min-w-5 h-5 px-1 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
                {conversation.unreadCount}
              </div>
            )}

          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
};

export default OtherUser;