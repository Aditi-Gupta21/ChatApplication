import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const SendInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const {messages} = useSelector(store=>store.message)


  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Ensure a user is selected
    if (!selectedUser) return;
    if (!message.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:9000/api/v1/message/send/${selectedUser._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(res.data);
      dispatch(setMessages([...messages, res?.data?.newMessage]));

      // Clear the input after sending
      setMessage("");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="w-full p-4 border-t border-zinc-700"
    >
      <div className="relative ">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send a message..."
          className="w-full border border-zinc-500 bg-gray-700 text-white rounded-lg p-3 pr-12 focus:outline-none focus:border-blue-500"
        />

        <button
          type="submit" 
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-white hover:text-blue-400"
        >
          <IoSend size={20} />
        </button>
      </div>
    </form>
  );
};

export default SendInput;