import { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import { updateConversation } from '../redux/conversationSlice'

const SendInput = () => {
  const [message, setMessage] = useState("");
  const typingRef = useRef(false);
  const typingTimeoutRef = useRef(null);

  const dispatch = useDispatch();
  const { selectedUser, authUser } = useSelector((store) => store.user);
  const { messages } = useSelector(store => store.message)
  const { socket } = useSelector((store) => store.socket);

  const typingHandler = (e) => {
    const value = e.target.value;
    setMessage(value);

    if (!selectedUser || !socket) return;

    // Emit typing only once
    if (!typingRef.current) {
      socket.emit("typing", {
        receiverId: selectedUser._id,
        senderId: authUser._id,
      });

      typingRef.current = true;
    }

    // Reset timer
    clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping", {
        receiverId: selectedUser._id,
        senderId: authUser._id,
      });

      typingRef.current = false;
    }, 1000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Ensure a user is selected
    if (!selectedUser) return;
    if (!message.trim()) return;

    try {

      if (socket && selectedUser) {
        socket.emit("stopTyping", {
          receiverId: selectedUser._id,
          senderId: authUser._id,
        });

        typingRef.current = false;
        clearTimeout(typingTimeoutRef.current);
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/message/send/${selectedUser._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch(setMessages([...messages, res?.data?.newMessage]));
      dispatch(updateConversation({
        receiverId: selectedUser._id,
        message: res.data.newMessage.message,
        createdAt: res.data.newMessage.createdAt,
      }));

      // Clear the input after sending
      setMessage("");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="sticky bottom-0 border-t border-[var(--color-border)] bg-[var(--color-surface)]/90 px-3 py-3 backdrop-blur-md md:px-4 md:py-4"
    >
      <div className="flex items-center gap-2 md:gap-3">
        <input
          type="text"
          value={message}
          onChange={typingHandler}
          placeholder="Type a message..."
          className="
            h-12
            flex-1
            rounded-full
            border
            border-[var(--color-border)]
            bg-[var(--color-surface-muted)]
            px-5
            text-[15px]
            text-[var(--color-ink)]
            outline-none
            transition-all
            duration-200
            placeholder:text-slate-400
            focus:border-[var(--color-accent)]
            focus:bg-[var(--color-surface)]
            focus:ring-4
            focus:ring-[var(--color-accent-soft)]
          "
        />

        <button
          type="submit"
          disabled={!message.trim()}
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[var(--color-accent)]
            text-white
            shadow-md
            transition-all
            duration-200
            hover:scale-105
            hover:brightness-110
            active:scale-95
            disabled:scale-100
            disabled:cursor-not-allowed
            disabled:bg-slate-300
            disabled:shadow-none
          "
        >
          <IoSend size={20} />
        </button>
      </div>
    </form>
  );
};

export default SendInput;