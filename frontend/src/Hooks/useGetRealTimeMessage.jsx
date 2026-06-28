import { useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();
  const store = useStore();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      const currentMessages = store.getState().message.messages;
      dispatch(setMessages([...currentMessages, newMessage]));
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, dispatch, store]);
};

export default useGetRealTimeMessage;