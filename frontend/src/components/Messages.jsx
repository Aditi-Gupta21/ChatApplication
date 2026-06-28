import React from 'react'
import Message from './Message'
import useGetMessages from '../Hooks/useGetMessages'
import { useSelector } from 'react-redux'
import useGetRealTimeMessage from '../Hooks/useGetRealTimeMessage'
import MessageSkeleton from './MessageSkeleton'

const Messages = () => {
  useGetRealTimeMessage(); useGetMessages();

  const { messages, loading } = useSelector(store => store.message);

  if (loading) {
    return <MessageSkeleton/>
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="flex justify-center items-center h-full text-gray-400">
        No messages yet.
      </div>
    );
  }

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {
        messages?.map((message) => {
          return (
            <Message key={message._id} message={message} />
          )
        })
      }

    </div>
  )
}

export default Messages
