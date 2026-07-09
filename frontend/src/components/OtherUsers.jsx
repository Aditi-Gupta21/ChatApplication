import React from "react";
import { FiUsers, FiSearch } from "react-icons/fi";
import OtherUser from "./OtherUser";
import useGetSidebarConversations from "../Hooks/useGetSidebarConversations";
import { useSelector } from "react-redux";
import useGetOtherUsers from "../Hooks/useGetOtherUsers";

const OtherUsers = ({ search }) => {
  useGetSidebarConversations();
  useGetOtherUsers();

  const { conversations=[], loading } = useSelector(
    (store) => store.conversation
  );

  const { otherUsers =[] } = useSelector((store) => store.user);

  const mergedUsers = otherUsers.map((user) => {
    const conversation = conversations.find(
      (conv) => conv.user._id === user._id
    );

    return (
      conversation || {
        _id: user._id,
        user,
        lastMessage: "",
        lastMessageTime: null,
        unreadCount: 0,
      }
    );
  });

  const filteredUsers = mergedUsers.filter((conversation) =>
    conversation.user.fullName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-3 p-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex animate-pulse items-center gap-3 rounded-3xl bg-white p-4 shadow-sm"
          >
            <div className="h-14 w-14 rounded-full bg-slate-200" />

            <div className="flex-1 space-y-3">
              <div className="h-3 w-1/3 rounded-full bg-slate-200" />
              <div className="h-3 w-2/3 rounded-full bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!otherUsers || otherUsers.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent-soft)]">
          <FiUsers
            size={28}
            className="text-[var(--color-accent)]"
          />
        </div>

        <h3 className="font-semibold text-[var(--color-ink)]">
          No Users Found
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Invite your friends to start chatting.
        </p>
      </div>
    );
  }

  if (filteredUsers.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-200">
          <FiSearch
            size={28}
            className="text-slate-500"
          />
        </div>

        <h3 className="font-semibold text-[var(--color-ink)]">
          No Results
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Try another search keyword.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        h-full
        overflow-y-auto
        px-3
        py-3
        space-y-2

        scrollbar-thin
        scrollbar-thumb-[var(--color-accent)]
        scrollbar-track-transparent
      "
    >
      {filteredUsers.map((conversation) => (
        <OtherUser
          key={conversation._id}
          conversation={conversation}
        />
      ))}
    </div>
  );
};

export default OtherUsers;