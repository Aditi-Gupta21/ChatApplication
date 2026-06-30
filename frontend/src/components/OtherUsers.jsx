import React from "react";
import OtherUser from "./OtherUser";
import useGetSidebarConversations from '../Hooks/useGetSidebarConversations'
import { useSelector } from "react-redux";

const OtherUsers = ({search}) => {
  useGetSidebarConversations();

  const { conversations, loading } = useSelector((store) => store.conversation);

  const filteredConversations = conversations.filter((conversation)=>{
    return conversation.user.fullName.toLowerCase().includes(search.toLowerCase());
  })

  if(loading){
    return (
      <div className="flex justify-center mt-5">
        Loading...
      </div>
    );
  }

  if(!conversations || conversations.length === 0){
    return (
      <div className="flex justify-center mt-5">
        No conversations.
      </div>
    );
  }

  if(filteredConversations.length === 0){
    return (
      <div className="text-center mt-5 text-gray-400">
        No Conversations found.
      </div>
    )
  }

  return (
    <div className="overflow-auto flex-1">
      {filteredConversations.map((conversation) => (
        <OtherUser key={conversation._id} conversation={conversation} />
      ))}
    </div>
  );
};

export default OtherUsers;