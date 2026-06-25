import React from "react";
import { IoSend } from "react-icons/io5";

const SendInput = () => {
  return (
    <form className="w-full p-4 border-t border-zinc-700">
      <div className="relative">
        <input
          type="text"
          placeholder="Send a message..."
          className="w-full border border-zinc-500 bg-gray-700 text-white rounded-lg p-3 pr-12 focus:outline-none"
        />

        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-white"
        >
          <IoSend size={20} />
        </button>
      </div>
    </form>
  );
};

export default SendInput;