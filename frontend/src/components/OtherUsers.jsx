import React from "react";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../Hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

const OtherUsers = () => {
  useGetOtherUsers();

  const { otherUser } = useSelector((store) => store.user);

  if (!otherUser) return null;

  return (
    <div className="overflow-auto flex-1">
      {otherUser?.map((user) => (
        <OtherUser key={user._id} user={user} />
      ))}
    </div>
  );
};

export default OtherUsers;
