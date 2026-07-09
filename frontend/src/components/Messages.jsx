import React from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import MessageSkeleton from "./MessageSkeleton";
import useGetMessages from "../Hooks/useGetMessages";

const Messages = () => {
  useGetMessages();

  const { messages, loading } = useSelector(
    (store) => store.message
  );

  if (loading) {
    return <MessageSkeleton />;
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-6 text-center">

        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-4xl shadow-sm">
          💬
        </div>

        <h2
          className="text-2xl font-bold text-[var(--color-ink)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Start your conversation
        </h2>

        <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
          Messages are private and secure.
          Send your first message and start chatting.
        </p>

      </div>
    );
  }

  return (
    <div
      className="
        flex
        flex-col
        space-y-3
        px-2
        pb-8
        md:px-4
      "
    >
      {messages.map((message) => (
        <Message
          key={message._id}
          message={message}
        />
      ))}
    </div>
  );
};

export default Messages;