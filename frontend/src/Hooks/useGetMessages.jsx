import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages, setLoading } from "../redux/messageSlice";

const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedUser?._id) return;

    const fetchMessages = async () => {
      try {
        // start loading 
        dispatch(setLoading(true));

        const res = await axios.get(
          `http://localhost:9000/api/v1/message/${selectedUser._id}`,
          {
            withCredentials: true,
          }
        );

        dispatch(setMessages(res.data));
      } catch (error) {
        console.log(error);
      }finally{
        // Stop loading (runs whether request succeeds or fails)
        dispatch(setLoading(false));
      }
    };

    fetchMessages();
  }, [selectedUser, dispatch]);
};

export default useGetMessages;