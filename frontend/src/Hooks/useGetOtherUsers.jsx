import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { setOtherUsers } from "../redux/userSlice";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/`,
          {
            withCredentials: true,
          }
        );
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchOtherUsers();
  }, [dispatch]);
};

export default useGetOtherUsers;