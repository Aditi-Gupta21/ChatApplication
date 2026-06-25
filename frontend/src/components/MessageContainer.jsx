import React from 'react'
import SendInput from './SendInput.jsx'
import Messages from './Messages.jsx'

const MessageContainer = () => {
  return (
    <div className='md:min-w-[450px] flex flex-col m-4'>
      <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src="https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg" alt="user profile" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex justify-between gap-2">
            <p> Raj Striver </p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
      <Messages/>
      <SendInput/>
      
    </div>
  )
}

export default MessageContainer
