const MessageSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className={`chat ${
            index % 2 === 0 ? "chat-start" : "chat-end"
          }`}
        >
          <div className="chat-image avatar">
            <div className="w-10 rounded-full skeleton"></div>
          </div>

          <div className="chat-bubble bg-transparent p-0 shadow-none">
            <div className="skeleton h-4 w-40"></div>
            <div className="skeleton h-4 w-24 mt-2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;